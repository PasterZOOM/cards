import React, { useEffect } from 'react';

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
import { openModal } from 'common/utils/modalUtils';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { PacksParams } from 'features/Cards/Packs/CardPacksParams/PacksParams';
import { setCardPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';
import styles from 'features/Cards/Packs/Packs.module.scss';
import { loadPacks } from 'features/Cards/Packs/packsReducer';
import {
  getCardPacks,
  getCardPacksTotalCount,
} from 'features/Cards/Packs/packsSelectors';
import { PackModalType } from 'features/Modal/modalReduscer';

export const Packs = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);
  const packs = useAppSelector(getCardPacks);

  const [searchParams, setSearchParams] = useSearchParams();

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

  const createNewPack = (): void => {
    openModal(
      {
        open: modal.CREATE_PACK,
        title: 'Add new pack',
        packModal: { name: '', private: false } as PackModalType,
      },
      dispatch,
    );
  };

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Typography className={styles.title}>Packs list</Typography>
        <GeneralButton label="Add new cards" onClick={createNewPack} />
      </div>
      <PacksParams />
      <div className={styles.body}>
        {packs.length !== 0 ? (
          <div>
            <DataTable tableType="packs" />
            <Paginator cardPacksTotalCount={cardPacksTotalCount} />
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
