import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Registration.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { minPasswordDigits } from 'const/minPasswordDigits';
import { path } from 'enums/path';
import { createUser } from 'faetures/Registration/registrationReducer';
import { RegistrationFormErrorType } from 'types/RegistrationTypes';

export const Registration: React.FC = () => {
  const isRegistered = useAppSelector(state => state.registration.isRegistered);

  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const registrationForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: RegistrationFormErrorType = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < minPasswordDigits)
        errors.password = `Password must be more than ${minPasswordDigits} digits`;
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword !== values.password)
        errors.confirmPassword = 'Passwords must be the same';

      return errors;
    },
    onSubmit: values => {
      dispatch(createUser({ email: values.email, password: values.password }));
      registrationForm.resetForm();
    },
  });

  if (isRegistered) return <Navigate to={path.PROFILE} />;

  return (
    <div className={styles.main}>
      <Grid container justifyContent="center">
        <Grid item justifyContent="center">
          <FormControl>
            <FormLabel>
              <h1>Sing Up</h1>
            </FormLabel>

            <form onSubmit={registrationForm.handleSubmit}>
              <FormGroup>
                <TextField
                  label="Email"
                  variant="standard"
                  margin="normal"
                  {...registrationForm.getFieldProps('email')}
                />

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <InputLabel>Password</InputLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    margin="dense"
                    {...registrationForm.getFieldProps('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <InputLabel>Password</InputLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    margin="dense"
                    {...registrationForm.getFieldProps('confirmPassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Button type="submit" variant="contained" color="primary">
                  Sing Up
                </Button>
              </FormGroup>
            </form>
            <NavLink to={path.LOGIN}>Do you have an account?</NavLink>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};
