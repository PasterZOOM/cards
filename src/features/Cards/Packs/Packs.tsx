import React, { useEffect } from 'react';

import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import { packsAPI } from 'api/cardsAPI';
import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { packsOwn } from 'common/enums/packsOwn';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getLocalStorage } from 'common/utils/localStorageUtil';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { Options } from 'features/Cards/Packs/Options/Options';
import { getPacksOptionsParams } from 'features/Cards/Packs/Options/packsOptionsSelectors';
import { changeFilterByOwn } from 'features/Cards/Packs/Options/paksOptionsReducer';
import style from 'features/Cards/Packs/Packs.module.css';
import { getPacks } from 'features/Cards/Packs/packsReducer';

export const Packs = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const userId = useAppSelector(getUserId);
  const params = useAppSelector(getPacksOptionsParams);

  useEffect(() => {
    dispatch(
      changeFilterByOwn({
        userId: getLocalStorage('PacksOwn') === packsOwn.MY ? userId : undefined,
      }),
    );
    dispatch(getPacks(params));
  }, [dispatch, params, userId]);

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
      <Options />
      <Box>
        <DataTable />
      </Box>
      <div className={style.pagination}>
        <Paginator />
      </div>
    </div>
  );
};
