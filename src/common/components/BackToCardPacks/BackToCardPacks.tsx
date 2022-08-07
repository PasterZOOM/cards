import React from 'react';

import Typography from '@mui/material/Typography/Typography';
import { NavLink, useSearchParams } from 'react-router-dom';

import styles from './BackToCardPacks.module.scss';

import back from 'assets/images/Back.svg';
import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsSelectors';

export const BackToCardPacks = (): ReturnComponentType => {
  const params = useAppSelector(getCardPacksParams);
  const queryParams: any = {};

  Object.entries(params).forEach(param => {
    if (param[1] !== undefined) queryParams[param[0]] = String(param[1]);
  });

  const [searchParams] = useSearchParams(queryParams);

  return (
    <NavLink to={`${path.CARD_PACKS}?${searchParams}`} className={styles.link}>
      <img src={back} alt="back" className={styles.icon} />
      <Typography className={styles.title}>Back to Packs List</Typography>
    </NavLink>
  );
};
