import { Button } from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { UserAvatar } from 'components/Avatar/Avatar';

import { useRef, useState } from 'react';
import { UploadAvatarDialog } from './UploadAvatarDialog';

type AvatarWithUploadProps = {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
};

export const AvatarWithUpload = ({
    firstName,
    lastName,
    avatarUrl,
}: AvatarWithUploadProps) => {
    const [uploadAvatarDialogOpen, setUploadAvatarDialogOpen] = useState(false);
    const handleAvatarUpload = () => {
        setUploadAvatarDialogOpen(true);
    };
    const openId = useRef<number>(1);

    const handleUploadAvatarDialogClose = () => {
        setUploadAvatarDialogOpen(false);
        openId.current += 1;
    };
    return (
        <div style={{ position: 'relative' }}>
            <label
                htmlFor="contained-button-file"
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '64px',
                    left: '64px',
                }}
            >
                {/* <Input
                id="contained-button-file"
                name="contained-button-file"
                // @ts-ignore
                accept="image/*"
                multiple
                type="file"
                sx={{ display: 'none' }}
            /> */}
                <Button
                    variant="contained"
                    component="span"
                    size="large"
                    onClick={handleAvatarUpload}
                    sx={{
                        borderRadius: 99,
                        height: '40px',
                        width: '40px',
                        minHeight: '40px',
                        minWidth: '40px',
                        padding: '0',
                    }}
                >
                    <AddPhotoAlternateIcon />
                </Button>
            </label>

            <UserAvatar
                size={100}
                firstName={firstName}
                lastName={lastName}
                avatarUrl={avatarUrl}
            />
            <UploadAvatarDialog
                key={openId.current}
                open={uploadAvatarDialogOpen}
                handleClose={handleUploadAvatarDialogClose}
            />
        </div>
    );
};
