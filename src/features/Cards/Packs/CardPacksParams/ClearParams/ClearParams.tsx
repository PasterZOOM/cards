import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import { useSearchParams } from 'react-router-dom';

import styles from './ClearParams.module.scss';

import clear from 'assets/images/filterRemove.svg';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { clearURLParams } from 'common/utils/clearURLParams';

export const ClearParams = (): ReturnComponentType => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clearParams = (): void => {
    clearURLParams(
      ['page', 'user_id', 'packName', 'min', 'max', 'sortPacks', 'pageCount'],
      searchParams,
    );
    setSearchParams(searchParams);
  };

  return (
    <IconButton onClick={clearParams} className={styles.button}>
      <img src={clear} alt="learn" />
    </IconButton>
  );
};
