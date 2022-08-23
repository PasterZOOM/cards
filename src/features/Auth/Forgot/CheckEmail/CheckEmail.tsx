import React, { useEffect } from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';

import styles from './CheckEmail.module.scss';

import { setAppStatus } from 'app/appReducer';
import checkEmail from 'assets/images/checkEmail.svg';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { path } from 'common/enums/path';
import { requestStatus } from 'common/enums/requestStatus';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const CheckEmail = (): ReturnComponentType => {
  const email = useAppSelector(state => state.forgot.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickButtonHandle = (): void => {
    navigate(path.LOGIN);
  };

  useEffect(() => {
    dispatch(setAppStatus({ status: requestStatus.IDLE }));
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
