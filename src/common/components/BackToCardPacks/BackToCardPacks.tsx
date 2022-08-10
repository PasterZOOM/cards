import React from 'react';

import Typography from '@mui/material/Typography/Typography';
import { NavLink } from 'react-router-dom';

import styles from './BackToCardPacks.module.scss';

import back from 'assets/images/Back.svg';
import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsSelectors';

export const BackToCardPacks = (): ReturnComponentType => {
  const params = useAppSelector(getPacksParams);
  const queryParams: Array<string> = [];

  Object.entries(params).forEach(param => {
    if (param[1] !== undefined) queryParams.push(`${[param[0]]}=${param[1]}&`);
  });

  return (
    <NavLink to={`${path.PACKS}?${queryParams.join('')}`} className={styles.link}>
      <img src={back} alt="back" className={styles.icon} />
      <Typography className={styles.title}>Back to Packs List</Typography>
    </NavLink>
  );
};
