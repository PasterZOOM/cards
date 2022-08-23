import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik, FormikHelpers } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './ForgotPassword.module.scss';

import { getAppStatus } from 'app/appSelectors';
import { path } from 'common/enums/path';
import { requestStatus } from 'common/enums/requestStatus';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { ForgotForm } from 'features/Auth/Forgot/ForgotPassword/ForgotForm/ForgotForm';
import { validateForgotForm } from 'features/Auth/Forgot/ForgotPassword/ForgotForm/validateForgotForm';
import { ForgotPasswordFormType } from 'features/Auth/Forgot/ForgotPassword/ForgotPasswordTypes';
import { sendEmail } from 'features/Auth/Forgot/forgotReducer';

export const ForgotPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAppStatus);

  const submitRegisterForm = async (
    { email }: ForgotPasswordFormType,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormType>,
  ): Promise<void> => {
    await dispatch(sendEmail(email));
    setSubmitting(false);
  };

  if (status === requestStatus.SUCCEEDED) return <Navigate to={path.CHECK_EMAIL} />;

  return (
    <Paper elevation={3} className={styles.main}>
      <Typography className={styles.title}>Forgot your password?</Typography>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validateForgotForm}
        onSubmit={submitRegisterForm}
        validateOnMount={false}
      >
        {formik => <ForgotForm formik={formik} />}
      </Formik>
      <Typography className={styles.question}>Did you remember your password?</Typography>
      <NavLink to={path.LOGIN} className={styles.link}>
        Try logging in
      </NavLink>
    </Paper>
  );
};
