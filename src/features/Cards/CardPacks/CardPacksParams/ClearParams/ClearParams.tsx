import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import { useNavigate } from 'react-router-dom';

import styles from './ClearParams.module.scss';

import clear from 'assets/images/filterRemove.svg';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const ClearParams = (): ReturnComponentType => {
  const navigate = useNavigate();

  const clearParams = (): void => {
    navigate(path.CARD_PACKS);
  };

  return (
    <IconButton onClick={clearParams} className={styles.button}>
      <img src={clear} alt="learn" />
    </IconButton>
  );
};
