import React, { useCallback, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { getLocalStorage } from '../../../common/utils/localStorageUtil';
import { TopPart } from '../common/components/TopPart';

import styles from './CardPacks.module.scss';
import {
  changePacksPage,
  changePacksPageCount,
} from './CardPacksParams/cardPacksParamsReducer';
import { getCardPacksTotalCount } from './cardPacksSelectors';

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
  getUserIdPacksParams,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsSelectors';
import { loadCardPacks } from 'features/Cards/CardPacks/cardsPacksReducer';

export const CardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const params = useAppSelector(getCardPacksParams);
  const addNewPackButtonTitle = 'Add new pack';
  const title = 'Packs list';
  const userId = useAppSelector(getUserIdPacksParams);
  const pageCount = useAppSelector(getPageCountPacksParams);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);
  const pageCountNumber = getLocalStorage('pageCount')
    ? parseInt(getLocalStorage('pageCount') as string, 10)
    : pageCount;

  useEffect(() => {
    dispatch(loadCardPacks({ ...params, pageCount: pageCountNumber }));
  }, [dispatch, params]);

  const addNewPackHandler = useCallback((): void => {
    alert('create new pack');
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  const changePageHandler = (page: number): void => {
    dispatch(changePacksPage({ page }));
  };

  const changePageCountHandler = (pageCount: number): void => {
    dispatch(changePacksPageCount({ pageCount }));
  };

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
          <Paginator
            cardPacksTotalCount={cardPacksTotalCount}
            pageCount={pageCount}
            userId={userId}
            changePage={changePageHandler}
            changePageCount={changePageCountHandler}
          />
        </div>
      </div>
    </div>
  );
};
