import React, { useEffect } from 'react';

import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import { packsAPI } from 'api/cardsAPI';
import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import style from 'features/Cards/CardPacks/CardPacks.module.css';
import { CardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/CardPacksParams';
import { getCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsSelectors';
import { getCardPacks } from 'features/Cards/CardPacks/cardsPacksReducer';

export const CardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const params = useAppSelector(getCardPacksParams);

  useEffect(() => {
    dispatch(getCardPacks(params));
  }, [dispatch, params]);

  const addNewPackHandler = (): void => {
    packsAPI.createPack({
      cardsPack: { name: 'create new cool pack', private: false, deckCover: '' },
    });
  };

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
      <CardPacksParams />
      <Box>
        <DataTable />
      </Box>
      <div className={style.pagination}>
        <Paginator />
      </div>
    </div>
  );
};
