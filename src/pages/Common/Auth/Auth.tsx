/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Description } from 'components/Description/Description';
import { useAuthenticate } from 'hooks/useAuthenticate';
import * as yup from 'yup';

import api from 'api';

import { useCallback, useEffect, useState } from 'react';

import { APP_ROUTES } from 'consts/ROUTES';
import { VALIDATION_MESSAGES } from 'consts/VALIDATION_MESSAGES';
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { userProfileState } from 'state/user';
import { notificationState } from 'state/notification';
import styles from './styles.module.scss';

const validationSchema = yup.object({
    email: yup
        .string()
        .email(VALIDATION_MESSAGES.NOT_VALID_EMAIL)
        .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
    password: yup.string().required(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});

export const Auth = () => {
    const refresh = useRecoilRefresher_UNSTABLE(userProfileState);

    const navigate = useNavigate();

    const setNotification = useSetRecoilState(notificationState);

    const errorHandler = (error: any) => {
        setNotification({
            open: true,
            message: error.response.data.message,
            severity: 'error',
        });
    };

    const authCallback = async () => {
        await refresh();
        navigate(APP_ROUTES.MAIN);
    };
    const [SSOUrl, setSSOUrl] = useState('');
    const { submit } = useAuthenticate(errorHandler, authCallback);
    useEffect(() => {
        async function getSSOUrl() {
            const { data, error } = await api.sso.getOpenIdaAuthorizationUrl();
            if (data) {
                setSSOUrl(data);
            }
            if (error) {
                setNotification({
                    open: true,
                    message: 'There were error fetching SSO URL',
                    severity: 'error',
                });
            }
        }
        getSSOUrl();
    }, []);

    const handleSSO = useCallback(() => {
        window.location.href = SSOUrl;
    }, [SSOUrl]);

    const goToSignUpPage = () => {
        navigate(APP_ROUTES.REGISTER);
    };
    const goToPasswordChange = () => {
        navigate(APP_ROUTES.RESET_PASSWORD);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema,
        onSubmit: ({ email, password }) => {
            submit({ email, password });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.authFormContainer}>
                <Description>Log in</Description>
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
                <Button color="primary" variant="contained" type="submit">
                    LOG IN
                </Button>

                <Divider flexItem>
                    <span className={styles.dividerText}>or login with</span>
                </Divider>
                <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleSSO}
                >
                    <img src="uni_logo.svg" alt="" />{' '}
                    <span className={styles.SSOButtonText}>
                        INNOPOLIS UNIVERSITY
                    </span>
                </Button>

                <Link
                    component="button"
                    color="#91a3b0"
                    onClick={goToSignUpPage}
                >
                    Don’t have an account? Go to{' '}
                    <span className={styles.highEmphasisText}>Sign Up</span>
                </Link>
                <Link
                    component="button"
                    color="#91a3b0"
                    onClick={goToPasswordChange}
                >
                    Forgot password?
                </Link>
            </div>
        </form>
    );
};
