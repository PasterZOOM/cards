import React, { useEffect, useMemo } from 'react';

import Avatar from '@mui/material/Avatar/Avatar';
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
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import styles from 'features/Cards/Packs/Packs.module.scss';
import { PacksParams } from 'features/Cards/Packs/PacksParams/PacksParams';
import { setCardPacksParams } from 'features/Cards/Packs/PacksParams/packsParamsReducer';
import { getPacksParams } from 'features/Cards/Packs/PacksParams/packsParamsSelectors';
import { loadPacks } from 'features/Cards/Packs/packsReducer';
import {
  getCardPacks,
  getCardPacksTotalCount,
} from 'features/Cards/Packs/packsSelectors';
import { openModal } from 'features/Modal/modalReducer';
import { getAnotherUser } from 'features/Social/User/userSelectors';

export const Packs = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const user = useAppSelector(getAnotherUser);
  const isMyPacks = useAppSelector(getUserId) === user._id;
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);
  const packs = useAppSelector(getCardPacks);
  const isPacksAnotherUser = user._id === searchParams.get('user_id');

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
        {isPacksAnotherUser && !isMyPacks ? (
          <div className={styles.userInfo}>
            <Typography className={styles.userName}>{user.name}</Typography>
            <Avatar
              alt="avatar"
              src={user.avatar || undefined}
              className={styles.avatar}
            />
          </div>
        ) : (
          <GeneralButton label="Add new pack" onClick={createNewPack} />
        )}
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
