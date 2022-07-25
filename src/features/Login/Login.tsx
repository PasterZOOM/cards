import React from 'react';

import { Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import { loginTC } from './authReducer';

import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Login = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values));
    },
  });

  if (isLoggedIn) return <Navigate to={path.PROFILE} />;

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
          <h1>Sing In</h1>
        </FormLabel>
      </Grid>
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField
                label="Email"
                multiline
                variant="standard"
                {...formik.getFieldProps('email')}
              />
              <TextField
                label="Password"
                multiline
                variant="standard"
                type="password"
                {...formik.getFieldProps('password')}
              />
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    name="rememberMe"
                  />
                }
              />

              <NavLink to={path.PROFILE}>Forgot password?</NavLink>

              <SubmitButton label="Sing In" />
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
      <Grid item>
        <span>Dont have an account?</span>
      </Grid>
      <Grid item>
        <NavLink to={path.REGISTRATION}>Sing Up</NavLink>
      </Grid>
    </Grid>
  );
};
