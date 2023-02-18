import { Box, Button } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileState } from 'state/user';

import { useRef, useState } from 'react';
import api from 'api';
import { notificationState } from 'state/notification';
import styles from './styles.module.scss';
import { PersonalDescriptionRow } from './components/PersonalDescriptionRow';
import { AvatarWithUpload } from './components/AvatarWithUpload';
import { ChangePasswordDialog } from './components/ChangePasswordDialog';
import { EditInformationDialog } from './components/EditInformationDialog';

export const ProfilePage = () => {
    const { data } = useRecoilValue(userProfileState);
    const openId = useRef<number>(1);
    if (!data) {
        return null;
    }
    const {
        firstName,
        lastName,
        email,
        history,
        placeOfWork,
        position,
        telegram,
        linkedIn,
        description,
        role,
        avatarUrl,
    } = data.user;

    const setNotification = useSetRecoilState(notificationState);
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
        useState(false);

    const handleChangePasswordDialogOpen = () => {
        setChangePasswordDialogOpen(true);
    };

    const handleChangePasswordDialogClose = () => {
        setChangePasswordDialogOpen(false);
    };

    const [editInformationDialogOpen, setEditInformationDialogOpen] =
        useState(false);

    const handleEditInformationDialogOpen = () => {
        setEditInformationDialogOpen(true);
    };

    const handleEditInformationDialogClose = () => {
        setEditInformationDialogOpen(false);
        openId.current += 1;
    };

    const handlePasswordChange = async () => {
        const { response, error } = await api.user.resetPassword({ email });
        if (response.success) {
            setNotification({
                open: true,
                message: 'Password reset link has been sent to you email',
                severity: 'success',
            });
            handleChangePasswordDialogClose();
        }
        if (error) {
            setNotification({
                open: true,
                message: 'There were error, try again',
                severity: 'error',
            });
        }
    };
    return (
        <Box className={styles.profileGrid}>
            <Box className={styles.header}>
                <Box className={styles.mainUserInfo}>
                    <AvatarWithUpload
                        firstName={firstName}
                        lastName={lastName}
                        avatarUrl={avatarUrl}
                    />
                    <Box className={styles.nameAndEmailContainer}>
                        <div>{`${firstName} ${lastName}`}</div>
                        <div>{email}</div>
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    onClick={handleEditInformationDialogOpen}
                >
                    Edit information
                </Button>
            </Box>
            <Box className={styles.personalInfo}>
                <div className={styles.boxHeader}>Personal information</div>
                <div>
                    <PersonalDescriptionRow property="Name" value={firstName} />
                    <PersonalDescriptionRow
                        property="Last name"
                        value={lastName}
                    />
                    {role === 'ALUMNI' && (
                        <>
                            <PersonalDescriptionRow
                                property="Degree"
                                value={history[0].degree}
                            />
                            <PersonalDescriptionRow
                                property="Group"
                                value={history[0].group}
                            />
                            <PersonalDescriptionRow
                                property="Date of graduation"
                                value={new Date(
                                    history[0].dateGraduation,
                                ).toLocaleDateString('en-US')}
                            />
                        </>
                    )}
                    <PersonalDescriptionRow
                        property="Place of work"
                        value={placeOfWork}
                    />
                    <PersonalDescriptionRow
                        property="Position"
                        value={position}
                    />
                    <PersonalDescriptionRow
                        property="Telegram"
                        value={telegram}
                    />
                    <PersonalDescriptionRow
                        property="LinkedIn"
                        value={linkedIn}
                    />
                </div>
            </Box>
            <Box className={styles.description}>
                <div className={styles.boxHeader}>Description</div>
                <div>{description}</div>
            </Box>
            <Box className={styles.password}>
                <div className={styles.boxHeader}>Password</div>
                <Button
                    variant="outlined"
                    onClick={handleChangePasswordDialogOpen}
                >
                    Change Password
                </Button>
            </Box>
            {role === 'ALUMNI' && (
                <Box className={styles.extraNote}>
                    Please note that you cannot change the name in the system.
                    If you have changed your name, please contact the
                    administrator of the portal.
                </Box>
            )}

            <ChangePasswordDialog
                open={changePasswordDialogOpen}
                handleClose={handleChangePasswordDialogClose}
                handlePasswordChange={handlePasswordChange}
            />
            <EditInformationDialog
                key={openId.current}
                open={editInformationDialogOpen}
                handleClose={handleEditInformationDialogClose}
                personalData={data}
            />
        </Box>
    );
};
