/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import styles from 'pages/Common/Auth/styles.module.scss';
import { useRegister } from 'hooks/useRegister';
import * as yup from 'yup';
import { useFormik } from 'formik';
import api from 'api';

import { useSetRecoilState } from 'recoil';

import { notificationState } from 'state/notification';
import { APP_ROUTES } from 'consts/ROUTES';
import { Description } from 'components/Description/Description';
import { VALIDATION_MESSAGES } from 'consts/VALIDATION_MESSAGES';

const validationSchema = yup.object({
    email: yup
        .string()
        .email(VALIDATION_MESSAGES.NOT_VALID_EMAIL)
        .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),
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

export const Registration = () => {
    const [SSOUrl, setSSOUrl] = useState('');
    const setNotification = useSetRecoilState(notificationState);

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

    const navigate = useNavigate();

    const errorHandler = (error: {
        response: { data: { message: string } };
    }) => {
        setNotification({
            open: true,
            message: error?.response?.data?.message || 'Something went wrong',
            severity: 'error',
        });
    };
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

    const authCallback = async () => {
        setRegistrationSuccessful(true);
    };
    const { submit } = useRegister(errorHandler, authCallback);

    const handleSSO = useCallback(() => {
        window.location.href = SSOUrl;
    }, [SSOUrl]);

    const goToLoginPage = () => {
        navigate(APP_ROUTES.AUTH);
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

    if (registrationSuccessful) {
        return (
            <div className={styles.successfulRegistration}>
                <Description>Successful Registration</Description>
                <h2>
                    Registration request has been sent successfully, please
                    check your email to finish registration.
                </h2>
            </div>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.authFormContainer}>
                <Description>Sign up</Description>
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
                    SIGN UP
                </Button>

                <Divider flexItem>
                    <span className={styles.dividerText}>or sign up with</span>
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
                    onClick={goToLoginPage}
                >
                    Already have an account? Go to{' '}
                    <span className={styles.highEmphasisText}>Log in</span>
                </Link>
            </div>
        </form>
    );
};
