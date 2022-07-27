import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik, FormikHelpers } from 'formik';
import { NavLink } from 'react-router-dom';

import styles from './ForgotPassword.module.css';

import { path } from 'enums/path';
import { ForgotForm } from 'features/Forgot/ForgotPassword/ForgotForm/ForgotForm';
import { validateForgotForm } from 'features/Forgot/ForgotPassword/ForgotForm/validateForgotForm';
import { ForgotPasswordFormType } from 'features/Forgot/ForgotPassword/ForgotPasswordTypes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ForgotPassword = (): ReturnComponentType => {
  const submitRegisterForm = async (
    values: ForgotPasswordFormType,
    formikHelpers: FormikHelpers<ForgotPasswordFormType>,
  ): Promise<void> => {
    formikHelpers.setSubmitting(false);
  };

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
