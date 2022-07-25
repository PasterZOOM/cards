import React from 'react';

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
      <NavLink to={path.LOGIN}>
        <span className={styles.link}>Sign In</span>
      </NavLink>
    </div>
  );
};
