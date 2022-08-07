import React, { useCallback, useEffect } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';

import styles from './CardPacks.module.scss';
import { getCardPacksTotalCount } from './cardPacksSelectors';

import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualCardParamsParams } from 'common/utils/getActualParams';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { CardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/CardPacksParams';
import { setCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { loadCardPacks } from 'features/Cards/CardPacks/cardsPacksReducer';
import { TopPart } from 'features/Cards/common/components/TopPart';

const addNewPackButtonTitle = 'Add new pack';
const title = 'Packs list';

export const CardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);

  const [searchParams, setSearchParams] = useSearchParams();

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    dispatch(
      setCardPacksParams({
        params: getActualCardParamsParams(searchParams),
      }),
    );
  }, [dispatch, searchParams]);

  // читает URL и делает запрос за паками
  useEffect(() => {
    if (searchParams.get('cardsPack_id')) {
      searchParams.delete('cardsPack_id');
      setSearchParams(searchParams);
    } else {
      dispatch(loadCardPacks(getActualCardParamsParams(searchParams)));
    }
  }, [dispatch, searchParams, setSearchParams]);

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
