import React, { useEffect } from 'react';

import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import Typography from '@mui/material/Typography/Typography';

import styles from './OwnCardPacks.module.scss';

import { packsOwn } from 'common/enums/packsOwn';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getLocalStorage, setLocalStorage } from 'common/utils/localStorageUtil';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import {
  changeFilterByOwn,
  changePacksPage,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { FilterButton } from 'features/Cards/CardPacks/CardPacksParams/OwnCardPacks/FilterButton/FilterButton';

export const OwnCardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);
  const packsOwnLS = (getLocalStorage('PacksOwn') as packsOwn) || packsOwn.ALL;

  const onClickButton = (buttonName: packsOwn): void => {
    setLocalStorage('PacksOwn', buttonName);
    dispatch(
      changeFilterByOwn({ userId: buttonName === packsOwn.MY ? userId : undefined }),
    );
    dispatch(changePacksPage({ page: 1 }));
  };

  useEffect(() => {
    dispatch(
      changeFilterByOwn({
        userId: getLocalStorage('PacksOwn') === packsOwn.MY ? userId : undefined,
      }),
    );
  }, [dispatch, userId]);

  const buttons = [
    <FilterButton
      key={packsOwn.MY}
      title={packsOwn.MY}
      onClickButton={onClickButton}
      packsOwnLS={packsOwnLS}
    />,
    <FilterButton
      key={packsOwn.ALL}
      title={packsOwn.ALL}
      onClickButton={onClickButton}
      packsOwnLS={packsOwnLS}
    />,
  ];

  return (
    <div className={styles.main}>
      <Typography className={styles.title}>Show packs cards</Typography>
      <ButtonGroup>{buttons}</ButtonGroup>
    </div>
  );
};
