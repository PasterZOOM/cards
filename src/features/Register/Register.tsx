import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Register.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { FormRegister } from 'features/Register/FormRegister/FormRegister';
import { validateRegisterForm } from 'features/Register/FormRegister/validateRegisterForm';
import { createUser } from 'features/Register/registerReducer';
import { RegisterFormType } from 'features/Register/RegisterTypes';
import { ReturnComponentType } from 'types/ReturnComponentType';

const registerInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const Register = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  const submitRegisterForm = (values: RegisterFormType): void => {
    const { email, password } = { ...values };

    dispatch(createUser({ email, password }));
  };

  if (isLoggedIn) return <Navigate to={path.PROFILE} />;

  return (
    <Paper elevation={3} className={styles.main}>
      <Typography className={styles.title}>Sing Up</Typography>
      <Formik
        initialValues={registerInitialValues}
        validationSchema={validateRegisterForm}
        onSubmit={submitRegisterForm}
        validateOnMount={false}
      >
        {formik => <FormRegister formik={formik} />}
      </Formik>
      <Typography className={styles.span}>Do you have an account?</Typography>
      <NavLink to={path.LOGIN} className={styles.link}>
        Sign In
      </NavLink>
    </Paper>
  );
};
