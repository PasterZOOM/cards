import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import { packsAPI } from 'api/cardsAPI';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Options } from 'features/Cards/Packs/Options/Options';
import style from 'features/Cards/Packs/Packs.module.css';
import { getPacks } from 'features/Cards/Packs/packsReducer';
import {
  getCardPacksTotalCount,
  getPageCount,
  getPageNumber,
} from 'features/Cards/Packs/packsSelectors';

export const Packs = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const pageCount = useAppSelector(getPageCount);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);
  const pageNumber = useAppSelector(getPageNumber);

  useEffect(() => {
    dispatch(getPacks({ pageCount }));
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
      <Options />
      <div className={style.table}>table</div>
      <div className={style.pagination}>
        <Paginator
          cardPacksTotalCount={cardPacksTotalCount}
          pageCount={pageCount}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};
