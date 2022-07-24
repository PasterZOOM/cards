import React from 'react';

import { FormGroup } from '@mui/material';
import { Form, Formik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Register.module.css';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { createUser } from 'features/Register/registerReducer';
import { RegisterFormErrorType } from 'features/Register/RegisterTypes';
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

  const submitRegisterForm = (values: RegisterFormErrorType): void => {
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
        {formik => {
          return (
            <Form>
              <FormGroup>
                <div className={styles.field}>
                  <EmailField name="email" label="Email" />
                </div>
                <div className={styles.field}>
                  <PasswordField name="password" label="Password" />
                </div>
                <div className={styles.field}>
                  <PasswordField name="confirmPassword" label="Confirm Password" />
                </div>
                <div className={styles.submitButton}>
                  <SubmitButton
                    label="Sing Up"
                    disabled={!formik.isValid || formik.isSubmitting}
                  />
                </div>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
      <span>Do you have an account?</span>
      <NavLink to={path.LOGIN}>Sign In</NavLink>
    </div>
  );
};
