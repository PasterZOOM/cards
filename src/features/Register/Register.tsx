import React from 'react';

import { FormGroup, Grid } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { Form, Formik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

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
    <Grid
      style={{
        position: 'absolute',
        top: '120px',
        width: '413px',
        height: '528px',
        left: '50%',
        marginLeft: '-207px',
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '2px',
        padding: '35px 33px 42px',
      }}
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item>
        <FormLabel>
          <h1>Sing Up</h1>
        </FormLabel>
      </Grid>
      <Grid item>
        <Formik
          initialValues={registerInitialValues}
          validate={validateRegisterForm}
          onSubmit={submitRegisterForm}
        >
          <Form>
            <FormGroup>
              <EmailField name="email" label="Email" />
              <PasswordField name="password" label="Password" />
              <PasswordField name="confirmPassword" label="Confirm Password" />
              <SubmitButton label="Sing Up" />
            </FormGroup>
          </Form>
        </Formik>
      </Grid>
      <Grid item>Do you have an account?</Grid>
      <Grid item>
        <NavLink to={path.LOGIN}>Sign In</NavLink>
      </Grid>
    </Grid>
  );
};
