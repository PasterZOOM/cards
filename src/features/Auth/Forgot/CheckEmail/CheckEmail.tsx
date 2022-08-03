import React, { useEffect } from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';

import checkEmail from 'assets/images/checkEmail.svg';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import styles from 'features/Auth/Forgot/CheckEmail/CheckEmail.module.scss';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';

export const CheckEmail = (): ReturnComponentType => {
  const email = useAppSelector(state => state.forgot.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickButtonHandle = (): void => {
    navigate(path.LOGIN);
  };

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
      <div className={styles.button}>
        <GeneralButton
          onClick={onClickButtonHandle}
          label="Back to login"
          fullWidth
          type="submit"
        />
      </div>
    </Paper>
  );
};
