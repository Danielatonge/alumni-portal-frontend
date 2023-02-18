import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { User, ChangeableUserInfo } from 'types/user';
import api from 'api';
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { notificationState } from 'state/notification';
import { userProfileState } from 'state/user';

type ChangePasswordDialogProps = {
    open: boolean;
    handleClose: () => void;
    personalData?: { user: User };
};

export const EditInformationDialog = ({
    open,
    handleClose,
    personalData,
}: ChangePasswordDialogProps) => {
    const setNotification = useSetRecoilState(notificationState);

    const updateData = useRecoilRefresher_UNSTABLE(userProfileState);
    const submitPersonalInfoUpdate = async (
        newPersonalData: ChangeableUserInfo,
    ) => {
        const { response, error } = await api.user.updateUserDetails(
            newPersonalData,
        );

        if (response) {
            setNotification({
                open: true,
                message: 'Information has been successfully updated',
                severity: 'success',
            });
            handleClose();
            updateData();
        }
        if (error) {
            setNotification({
                open: true,
                message:
                    error?.response?.data?.message || 'Something went wrong',
                severity: 'error',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            placeOfWork: personalData?.user.placeOfWork || '',
            position: personalData?.user.position || '',
            telegram: personalData?.user.telegram || '',
            linkedIn: personalData?.user.linkedIn || '',
            description: personalData?.user.description || '',
        },
        onSubmit: newPersonalData => {
            submitPersonalInfoUpdate(newPersonalData);
        },
    });
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                    Edit personal information
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="placeOfWork"
                        name="placeOfWork"
                        label="Place Of Work"
                        value={formik.values.placeOfWork}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="position"
                        name="position"
                        label="Position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="telegram"
                        name="telegram"
                        label="Telegram"
                        value={formik.values.telegram}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="linkedIn"
                        name="linkedIn"
                        label="linkedIn"
                        value={formik.values.linkedIn}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        multiline
                        minRows={2}
                        maxRows={4}
                        id="description"
                        name="description"
                        label="Description (max 300 characters)"
                        value={formik.values.description}
                        inputProps={{ maxLength: 300 }}
                        onChange={formik.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
