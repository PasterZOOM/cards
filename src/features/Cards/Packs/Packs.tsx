import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import { packsAPI } from 'api/cardsAPI';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Options } from 'features/Cards/Packs/Options/Options';
import style from 'features/Cards/Packs/Packs.module.css';

export const Packs = (): ReturnComponentType => {
  useEffect(() => {}, []);

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
      <Options />
      <div className={style.table}>table</div>
      <div className={style.pagination}>
        <Paginator portionSize={5} pageSize={15} totalItemsCount={100} />
      </div>
    </div>
  );
};
