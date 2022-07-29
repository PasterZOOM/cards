import React, { useEffect } from 'react';

import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { NavLink } from 'react-router-dom';

import checkEmail from 'assets/images/checkEmail.svg';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import styles from 'features/Auth/Forgot/CheckEmail/CheckEmail.module.css';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';

export const CheckEmail = (): ReturnComponentType => {
  const email = useAppSelector(state => state.forgot.email);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeRedirect({ redirect: false }));
  }, [dispatch]);

  return (
    <Paper elevation={3} className={styles.main}>
      <Typography className={styles.title}>Check Email</Typography>
      <img src={checkEmail} alt="logo" className={styles.checkEmail} />
      <Typography className={styles.span}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <NavLink to={path.LOGIN} className={styles.link}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={styles.button}
        >
          Back to login
        </Button>
      </NavLink>
    </Paper>
  );
};
