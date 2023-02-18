import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import api from 'api';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { useSetRecoilState, useRecoilRefresher_UNSTABLE } from 'recoil';

import { notificationState } from 'state/notification';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { userProfileState } from 'state/user';

const validationSchema = yup.object({
    avatarUrl: yup
        .string()
        .url('Enter correct url!')
        .required('Please enter correct image URL'),
});
type UploadAvatarDialogProps = {
    open: boolean;
    handleClose: () => void;
};

export const UploadAvatarDialog = ({
    open,
    handleClose,
}: UploadAvatarDialogProps) => {
    const setNotification = useSetRecoilState(notificationState);
    const refresh = useRecoilRefresher_UNSTABLE(userProfileState);
    const formik = useFormik({
        initialValues: {
            avatarUrl: '',
        },
        validationSchema,
        onSubmit: async ({ avatarUrl }) => {
            const { response, error } = await api.user.updateUserDetails({
                avatarUrl,
            });
            if (response) {
                refresh();
                handleClose();
                setNotification({
                    open: true,
                    severity: 'success',
                    message: 'Avatar has been uploaded successfully',
                });
            }
            if (error) {
                setNotification({
                    open: true,
                    severity: 'error',
                    message:
                        'There was a error while updating user profile avatar',
                });
            }
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
                <DialogTitle id="alert-dialog-title">Update avatar</DialogTitle>
                <DialogContent sx={{ minWidth: '300px' }}>
                    <TextField
                        fullWidth
                        id="avatarUrl"
                        name="avatarUrl"
                        label="Avatar Url"
                        margin="normal"
                        value={formik.values.avatarUrl}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.avatarUrl &&
                            Boolean(formik.errors.avatarUrl)
                        }
                        helperText={
                            formik.touched.avatarUrl && formik.errors.avatarUrl
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" type="submit">
                        Update Avatar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
