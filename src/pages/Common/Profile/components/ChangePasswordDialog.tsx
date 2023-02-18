import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

type ChangePasswordDialogProps = {
    open: boolean;
    handleClose: () => void;
    handlePasswordChange: () => void;
};

export const ChangePasswordDialog = ({
    open,
    handleClose,
    handlePasswordChange,
}: ChangePasswordDialogProps) => (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Do you want to change your password?
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                The reset link will be sent to the email which is linked to your
                account
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlePasswordChange} autoFocus>
                Ok
            </Button>
        </DialogActions>
    </Dialog>
);
