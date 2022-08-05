import React, { useCallback, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { getLocalStorage } from '../../../common/utils/localStorageUtil';
import { TopPart } from '../common/components/TopPart';

import styles from './CardPacks.module.scss';

import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { CardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/CardPacksParams';
import {
  getCardPacksParams,
  getPageCountPacksParams,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsSelectors';
import { loadCardPacks } from 'features/Cards/CardPacks/cardsPacksReducer';

export const CardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const params = useAppSelector(getCardPacksParams);
  const addNewPackButtonTitle = 'Add new pack';
  const title = 'Packs list';
  const pageCount = useAppSelector(getPageCountPacksParams);
  const pageCountNumber = getLocalStorage('pageCount')
    ? parseInt(getLocalStorage('pageCount') as string, 10)
    : pageCount;

  useEffect(() => {
    dispatch(loadCardPacks({ ...params, pageCount: pageCountNumber }));
  }, [dispatch, params, pageCountNumber]);

  const addNewPackHandler = useCallback((): void => {
    alert('create new pack');
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <TopPart
        headTitle={title}
        buttonTitle={addNewPackButtonTitle}
        items
        onClickButton={addNewPackHandler}
        ownPack
      />
      <CardPacksParams />

      <div>
        <div className={styles.table}>
          <DataTable tableType="packs" />
        </div>
        <div className={styles.paginator}>
          <Paginator />
        </div>
      </div>
    </div>
  );
};
