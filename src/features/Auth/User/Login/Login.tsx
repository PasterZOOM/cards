import React, { useEffect, useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { login } from 'features/Auth/User/Login/authReducer';
import style from 'features/Auth/User/Login/Login.module.css';
import { LoginFormType } from 'features/Auth/User/Login/loginTypes';
import { validateLogin } from 'features/Auth/User/Login/validateLogin';

export const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const submitLoginForm = async (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ): Promise<void> => {
    await dispatch(login(values));
    formikHelpers.setSubmitting(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const onClickIconButtonHandler = (): void => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(changeRedirect({ redirect: false }));
  }, [dispatch]);

  if (isLoggedIn) return <Navigate to={path.PROFILE} />;

  return (
    <Paper elevation={3} className={style.main}>
      <Typography variant="h4" className={style.title}>
        Sing In
      </Typography>
      <Formik
        initialValues={{} as LoginFormType}
        validationSchema={validateLogin}
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
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              as={TextField}
              color="primary"
              label="Password"
              fullWidth
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onClickIconButtonHandler}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            <div className={style.linkToPassword}>
              <NavLink to={path.FORGOT_PASSWORD}>Forgot password?</NavLink>
            </div>

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

      <div className={style.linkToRegistration}>
        <NavLink to={path.REGISTRATION}>Sign Up</NavLink>
      </div>
    </Paper>
  );
};
