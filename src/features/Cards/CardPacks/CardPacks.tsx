import React, { useCallback, useEffect } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';

import styles from './CardPacks.module.scss';
import { getCardPacksTotalCount } from './cardPacksSelectors';

import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { startPageCount } from 'common/constants/projectConstants';
import { path } from 'common/enums/path';
import { sortPacks } from 'common/enums/sortPacks';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { CardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/CardPacksParams';
import { loadCardPacks } from 'features/Cards/CardPacks/cardsPacksReducer';
import { TopPart } from 'features/Cards/common/components/TopPart';

const addNewPackButtonTitle = 'Add new pack';
const title = 'Packs list';

export const CardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      loadCardPacks({
        user_id: searchParams.get('user_id') || undefined,
        packName: searchParams.get('packName') || undefined,
        min: Number(searchParams.get('min')) || undefined,
        max: Number(searchParams.get('max')) || undefined,
        sortPacks: (searchParams.get('sortPacks') as sortPacks) || undefined,
        page: Number(searchParams.get('page')) || undefined,
        pageCount: Number(searchParams.get('pageCount')) || startPageCount,
      }),
    );
  }, [dispatch, searchParams]);

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
          <Paginator cardPacksTotalCount={cardPacksTotalCount} />
        </div>
      </div>
    </div>
  );
};
