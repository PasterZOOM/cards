import React from 'react';

import { Formik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Register.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { FormRegister } from 'features/Register/FormRegister/FormRegister';
import { createUser } from 'features/Register/registerReducer';
import { RegisterFormType } from 'features/Register/RegisterTypes';
import { validateRegisterForm } from 'features/Register/validateRegisterForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

const registerInitialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const Register = (): ReturnComponentType => {
  const isRegistered = useAppSelector(state => state.register.isRegistered);
  const dispatch = useAppDispatch();

  const submitRegisterForm = (values: RegisterFormType): void => {
    if (values.email && values.password)
      dispatch(createUser({ email: values.email, password: values.password }));
  };

  if (isRegistered) return <Navigate to={path.PROFILE} />;

  return (
    <div className={styles.main}>
      <h1>Sing Up</h1>
      <Formik
        initialValues={registerInitialValues}
        validate={validateRegisterForm}
        onSubmit={submitRegisterForm}
        validateOnMount={false}
      >
        {formik => <FormRegister formik={formik} />}
      </Formik>
      <span>Do you have an account?</span>
      <NavLink to={path.LOGIN}>Sign In</NavLink>
    </div>
  );
};
