import React, { useCallback, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate, useSearchParams } from 'react-router-dom';

import { DataTable } from 'common/components/DataTable/DataTable';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { AddAndEditPackModal } from 'common/components/Modal/AddAndEditPackModal/AddAndEditPackModal';
import { ModalPackFormTypes } from 'common/components/Modal/AddAndEditPackModal/ModalPackForm/modalPackFormType';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualPacksParams } from 'common/utils/getActualParams';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { PacksParams } from 'features/Cards/Packs/CardPacksParams/PacksParams';
import { setCardPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';
import styles from 'features/Cards/Packs/Packs.module.scss';
import { createPack, loadPacks } from 'features/Cards/Packs/packsReducer';
import {
  getCardPacks,
  getCardPacksTotalCount,
} from 'features/Cards/Packs/packsSelectors';

export const Packs = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);
  const packs = useAppSelector(getCardPacks);

  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    dispatch(
      setCardPacksParams({
        params: getActualPacksParams(searchParams),
      }),
    );
  }, [dispatch, searchParams, setSearchParams]);

  // читает URL и делает запрос за паками
  useEffect(() => {
    if (searchParams.get('cardsPack_id')) {
      searchParams.delete('cardsPack_id');
      setSearchParams(searchParams);
    } else {
      dispatch(loadPacks(getActualPacksParams(searchParams)));
    }
  }, [dispatch, searchParams, setSearchParams]);

  const addNewPackHandler = useCallback((): void => {
    handleOpen();
  }, []);

  const createNewPack = (values: ModalPackFormTypes): void => {
    dispatch(
      createPack({
        name: values.packName,
        deckCover: '',
        private: values.packPrivate,
      }),
    );
  };

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Typography className={styles.title}>Packs list</Typography>
        <GeneralButton label="Add new cards" onClick={addNewPackHandler} />
      </div>
      <PacksParams />
      <div className={styles.body}>
        {packs.length !== 0 ? (
          <div>
            <DataTable tableType="packs" />
            <Paginator cardPacksTotalCount={cardPacksTotalCount} />
          </div>
        ) : (
          <Typography className={styles.title}>Nothing found for your request</Typography>
        )}
      </div>

      <AddAndEditPackModal
        callBack={createNewPack}
        handleClose={handleClose}
        open={open}
        title="Add new cards"
      />
    </div>
  );
};
