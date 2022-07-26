import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';

import styles from './ForgotPassword.module.css';

import { path } from 'enums/path';
import { ForgotForm } from 'features/ForgotPassword/ForgotPassword/ForgotForm/ForgotForm';
import { validateForgotForm } from 'features/ForgotPassword/ForgotPassword/ForgotForm/validateForgotForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ForgotPassword = (): ReturnComponentType => {
  const submitRegisterForm = (): void => {};

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
