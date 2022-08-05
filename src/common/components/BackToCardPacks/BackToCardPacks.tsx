import React from 'react';

import Typography from '@mui/material/Typography/Typography';
import { NavLink } from 'react-router-dom';

import styles from './BackToCardPacks.module.scss';

import back from 'assets/images/Back.svg';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const BackToCardPacks = (): ReturnComponentType => (
  <NavLink to={path.CARD_PACKS} className={styles.link}>
    <img src={back} alt="back" className={styles.icon} />
    <Typography className={styles.title}>Back to Packs List</Typography>
  </NavLink>
);
