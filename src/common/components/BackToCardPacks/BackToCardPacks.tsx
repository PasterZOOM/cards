import React from 'react';

import Typography from '@mui/material/Typography/Typography';
import { NavLink } from 'react-router-dom';

import styles from './BackToCardPacks.module.scss';

import back from 'assets/images/Back.svg';
import { useBack } from 'common/hooks/useBack';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const BackToCardPacks = (): ReturnComponentType => {
  const backToPacks = useBack();

  return (
    <NavLink to={backToPacks} className={styles.link}>
      <img src={back} alt="back" className={styles.icon} />
      <Typography className={styles.title}>Back to Packs List</Typography>
    </NavLink>
  );
};
