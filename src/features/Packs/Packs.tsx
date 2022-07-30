import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import style from './Packs.module.css';

import { packsAPI } from 'api/api';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Packs = (): ReturnComponentType => {
  useEffect(() => {
    console.log('запрос за колодами');
  }, []);

  const addNewPackHandler = (): void => {
    packsAPI.createPack({
      cardsPack: { name: 'create new cool pack', private: false, deckCover: '' },
    });
  };

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={style.main}>
      <div className={style.title}>
        <Typography className={style.name}>Packs list</Typography>
      </div>
      <div className={style.button}>
        <Button
          className={style.btn}
          variant="contained"
          color="primary"
          size="large"
          onClick={addNewPackHandler}
        >
          Add new pack
        </Button>
      </div>
      <div className={style.search}>search</div>
      <div className={style.table}>table</div>
      <div className={style.pagination}>
        <Paginator portionSize={5} pageSize={15} totalItemsCount={100} />
      </div>
    </div>
  );
};
