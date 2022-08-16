import React, { useEffect, useMemo } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate, useSearchParams } from 'react-router-dom';

import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { modal } from 'common/enums/modal';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualPacksParams } from 'common/utils/getActualParams';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { PacksParams } from 'features/Cards/Packs/CardPacksParams/PacksParams';
import { setCardPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';
import { getPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsSelectors';
import styles from 'features/Cards/Packs/Packs.module.scss';
import { loadPacks } from 'features/Cards/Packs/packsReducer';
import {
  getCardPacks,
  getCardPacksTotalCount,
} from 'features/Cards/Packs/packsSelectors';
import { openModal } from 'features/Modal/modalReducer';

export const Packs = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);
  const packs = useAppSelector(getCardPacks);

  const stateParams = useAppSelector(getPacksParams);
  const URLParams = useMemo(() => getActualPacksParams(searchParams), [searchParams]);

  const createNewPack = (): void => {
    dispatch(
      openModal({
        title: modal.ADD_PACK,
        data: { name: '', private: false, deckCover: '' },
      }),
    );
  };

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    if (JSON.stringify(stateParams) !== JSON.stringify(URLParams))
      dispatch(setCardPacksParams(URLParams));
  }, [dispatch, URLParams]);

  useEffect(() => {
    if (JSON.stringify(stateParams) === JSON.stringify(URLParams))
      dispatch(loadPacks(stateParams));
  }, [dispatch, stateParams]);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Typography className={styles.title}>Packs list</Typography>
        <GeneralButton label="Add new pack" onClick={createNewPack} />
      </div>
      <PacksParams />
      <div className={styles.body}>
        {packs.length !== 0 ? (
          <div>
            <DataTable tableType="packs" />
            <Paginator totalCount={cardPacksTotalCount} />
          </div>
        ) : (
          <Typography className={styles.title}>
            Nothing found for your request.
          </Typography>
        )}
      </div>
    </div>
  );
};
