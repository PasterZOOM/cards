import React from 'react';

import { Formik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Register.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { FormRegister } from 'features/Register/FormRegister/FormRegister';
import { createUser } from 'features/Register/registerReducer';
import { getRegistered } from 'features/Register/registerSelectors';
import { RegisterFormType } from 'features/Register/RegisterTypes';
import { validateRegisterForm } from 'features/Register/validateRegisterForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

const registerInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const Register = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const isRegistered = useAppSelector(getRegistered);
  const dispatch = useAppDispatch();

  const submitRegisterForm = (values: RegisterFormType): void => {
    if (values.email && values.password)
      dispatch(createUser({ email: values.email, password: values.password }));
  };

  if (isLoggedIn) return <Navigate to={path.PROFILE} />;
  if (isRegistered) return <Navigate to={path.LOGIN} />;

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Sing Up</h1>
      <Formik
        initialValues={registerInitialValues}
        validate={validateRegisterForm}
        onSubmit={submitRegisterForm}
        validateOnMount={false}
      >
        {formik => <FormRegister formik={formik} />}
      </Formik>
      <span className={styles.span}>Do you have an account?</span>
      <NavLink to={path.LOGIN} className={styles.link}>
        Sign In
      </NavLink>
    </div>
  );
};
