import React from 'react';

import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';

import styles from './Error404.module.scss';

import error404 from 'assets/images/error404.svg';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { useBack } from 'common/hooks/useBack';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Error404 = (): ReturnComponentType => {
  const navigate = useNavigate();
  const back = useBack();

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <Typography className={styles.title}>Ooops!</Typography>
        <Typography className={styles.text}>Sorry! Page not found!</Typography>
        <GeneralButton label="Back to home page" onClick={() => navigate(back)} />
      </div>
      <img src={error404} alt="Ошибка 404" />
    </div>
  );
};
