/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from 'pages/Common/Auth/styles.module.scss';

import * as yup from 'yup';
import { useFormik } from 'formik';
import api from 'api';

import { useSetRecoilState } from 'recoil';

import { notificationState } from 'state/notification';
import { APP_ROUTES } from 'consts/ROUTES';
import { VALIDATION_MESSAGES } from 'consts/VALIDATION_MESSAGES';

const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, VALIDATION_MESSAGES.PASSWORD_LENGTH)
        .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
    passwordConfirmation: yup
        .string()
        .oneOf(
            [yup.ref('password'), null],
            VALIDATION_MESSAGES.PASSWORDS_SHOULD_MATCH,
        ),
});

export const UpdatePassword = () => {
    const setNotification = useSetRecoilState(notificationState);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const passwordResetToken = searchParams.get('confirm_token');

    if (!passwordResetToken || passwordResetToken === null) {
        navigate('/');
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirmation: '',
        },
        validationSchema,
        onSubmit: async ({ password }) => {
            const { response, error } = await api.user.updatePassword({
                password,
                token: passwordResetToken as string,
            });

            if (response?.success) {
                setNotification({
                    open: true,
                    severity: 'success',
                    message: 'Please login with new password',
                });
                navigate(APP_ROUTES.AUTH);
            }
            if (error) {
                setNotification({
                    open: true,
                    severity: 'error',
                    message: 'There was a error, please try again',
                });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.authFormContainer}>
                <Typography
                    variant="h5"
                    component="div"
                    color="primary"
                    gutterBottom
                >
                    Update your password
                </Typography>
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <TextField
                    fullWidth
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label="Confirm password"
                    type="password"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.passwordConfirmation)
                    }
                    helperText={
                        formik.touched.password &&
                        formik.errors.passwordConfirmation
                    }
                />
                <Button color="primary" variant="contained" type="submit">
                    Update password
                </Button>
            </div>
        </form>
    );
};
