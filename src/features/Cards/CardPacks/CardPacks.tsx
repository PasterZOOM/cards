import React, { useCallback, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate, useSearchParams } from 'react-router-dom';

import styles from './CardPacks.module.scss';
import { getCardPacks, getCardPacksTotalCount } from './cardPacksSelectors';

import { DataTable } from 'common/components/DataTable/DataTable';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { AddAndEditPackModal } from 'common/components/Modal/AddAndEditPackModal/AddAndEditPackModal';
import { ModalPackFormTypes } from 'common/components/Modal/AddAndEditPackModal/ModalPackForm/modalPackFormType';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualCardParamsParams } from 'common/utils/getActualParams';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { CardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/CardPacksParams';
import { setCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { createPack, loadCardPacks } from 'features/Cards/CardPacks/cardsPacksReducer';

export const CardPacks = (): ReturnComponentType => {
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
        params: getActualCardParamsParams(searchParams),
      }),
    );
  }, [dispatch, searchParams, setSearchParams]);

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
    handleOpen();
  }, []);

  const createNewPack = (values: ModalPackFormTypes): void => {
    const create = {
      cardsPack: {
        name: values.namePack,
        deckCover: '',
        private: values.privatePack,
      },
    };

    dispatch(createPack({ create, load: getActualCardParamsParams(searchParams) }));
  };

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Typography className={styles.title}>Packs list</Typography>
        <GeneralButton label="Add new pack" onClick={addNewPackHandler} />
      </div>
      <CardPacksParams />
      <div className={styles.body}>
        {packs.length !== 0 ? (
          <div>
            <div className={styles.table}>
              <DataTable tableType="packs" />
            </div>
            <div className={styles.paginator}>
              <Paginator cardPacksTotalCount={cardPacksTotalCount} />
            </div>
          </div>
        ) : (
          <Typography className={styles.title}>Nothing found for your request</Typography>
        )}
      </div>

      <AddAndEditPackModal
        callBack={createNewPack}
        handleClose={handleClose}
        open={open}
        title="Add new pack"
      />
    </div>
  );
};
