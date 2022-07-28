import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik, FormikHelpers } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './ForgotPassword.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { ForgotForm } from 'features/Forgot/ForgotPassword/ForgotForm/ForgotForm';
import { validateForgotForm } from 'features/Forgot/ForgotPassword/ForgotForm/validateForgotForm';
import { ForgotPasswordFormType } from 'features/Forgot/ForgotPassword/ForgotPasswordTypes';
import { sendEmail } from 'features/Forgot/ForgotPassword/forgotReducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ForgotPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(state => state.forgot.email);

  const submitRegisterForm = async (
    values: ForgotPasswordFormType,
    formikHelpers: FormikHelpers<ForgotPasswordFormType>,
  ): Promise<void> => {
    await dispatch(sendEmail(values.email));
    formikHelpers.setSubmitting(false);
  };

  if (email) return <Navigate to={path.CHECK_EMAIL} />;

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
