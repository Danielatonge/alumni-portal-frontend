import { atom } from 'recoil';

import { AlertColor } from '@mui/material/Alert';

export const notificationState = atom<{
    open: boolean;
    message?: string;
    severity?: AlertColor;
}>({
    key: 'notificationState',
    default: { open: false, message: '', severity: 'success' },
});
