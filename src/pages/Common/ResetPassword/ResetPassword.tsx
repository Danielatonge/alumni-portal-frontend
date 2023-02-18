/* eslint-disable jsx-a11y/anchor-is-valid */

import Button from '@mui/material/Button';

import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Description } from 'components/Description/Description';

import * as yup from 'yup';

import api from 'api';

import { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { notificationState } from 'state/notification';
import { VALIDATION_MESSAGES } from 'consts/VALIDATION_MESSAGES';
import styles from '../Auth/styles.module.scss';

const validationSchema = yup.object({
    email: yup
        .string()
        .email(VALIDATION_MESSAGES.NOT_VALID_EMAIL)
        .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
});

export const ResetPassword = () => {
    const [emailSet, setEmailSet] = useState(false);

    const setNotification = useSetRecoilState(notificationState);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async ({ email }) => {
            const { response, error } = await api.user.resetPassword({ email });
            if (response.success) {
                setNotification({
                    open: true,
                    message: 'Password reset link has been sent to you email',
                    severity: 'success',
                });
                setEmailSet(true);
            }
            if (error) {
                setNotification({
                    open: true,
                    message: 'There were error, try again',
                    severity: 'error',
                });
            }
        },
    });

    if (emailSet) {
        return (
            <div className={styles.successfulRegistration}>
                <Description>Password Reset Successfully</Description>
                <h2>Please check you email</h2>
            </div>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.authFormContainer}>
                <Description>Reset password</Description>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Button color="primary" variant="contained" type="submit">
                    Reset password
                </Button>
            </div>
        </form>
    );
};
