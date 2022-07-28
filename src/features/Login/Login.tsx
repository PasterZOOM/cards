import React from 'react';

import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';
import { object, string } from 'yup';

import { login } from './authReducer';
import style from './Login.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { LoginFormType } from 'features/Login/loginTypes';
import styles from 'features/Register/Register.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

const initialValues: LoginFormType = {
  email: '',
  password: '',
  rememberMe: false,
};

export const minPassword = 8;

export const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const submitLoginForm = async (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ): Promise<void> => {
    dispatch(login(values));
    formikHelpers.setSubmitting(false);
  };

  if (isLoggedIn) return <Navigate to={path.PROFILE} />;

  return (
    <Paper elevation={3} className={style.main}>
      <Typography variant="h4" className={style.title}>
        Sing In
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          email: string().required('Please enter email').email('Invalid email'),
          password: string()
            .required('Please enter password')
            .min(minPassword, 'Password should be minimum 7 characters long'),
        })}
        onSubmit={submitLoginForm}
      >
        {({ isSubmitting, handleChange, values, errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              name="email"
              type="email"
              as={TextField}
              variant="standard"
              color="primary"
              label="Email"
              fullWidth
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
            />

            <Box height={14} />
            <Field
              name="password"
              type="password"
              as={TextField}
              variant="standard"
              color="primary"
              label="Password"
              fullWidth
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
            />
            <Box height={14} />

            <div className={style.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    onChange={handleChange}
                    checked={values.rememberMe}
                  />
                }
                label="Remember Me"
              />
            </div>
            <Box height={14} />

            <NavLink to={path.FORGOT_PASSWORD} className={styles.linkToPassword}>
              Forgot password?
            </NavLink>

            <Box height={14} />

            <Button
              type="submit"
              className={style.btn}
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              disabled={!isValid || !dirty || isSubmitting}
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <div className={style.text}>Dont have an account?</div>

      <NavLink className={styles.linkToRegistration} to={path.REGISTRATION}>
        Sign Up
      </NavLink>
    </Paper>
  );
};
