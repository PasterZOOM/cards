import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import { useSearchParams } from 'react-router-dom';

import styles from './ClearParams.module.scss';

import clear from 'assets/images/filterRemove.svg';
import { clearURLParams } from 'common/utils/clearURLParams';

type PropsType = {
  params: Array<string>;
};

export const ClearParams: React.FC<PropsType> = ({ params }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clearParams = (): void => {
    clearURLParams(params, searchParams);
    setSearchParams(searchParams);
  };

  return (
    <IconButton onClick={clearParams} className={styles.button}>
      <img src={clear} alt="learn" />
    </IconButton>
  );
};
