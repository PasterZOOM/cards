import React, { useCallback } from 'react';

import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';

import { packsOwn } from 'common/enums/packsOwn';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getLocalStorage, setLocalStorage } from 'common/utils/localStorageUtil';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import {
  changeFilterByOwn,
  changePacksPage,
} from 'features/Cards/Packs/Options/paksOptionsReducer';
import styles from 'features/Cards/Packs/Options/SearchCardPacks/SearchCardPacks.module.scss';
import { FilterButton } from 'features/Cards/Packs/Options/ShowPacksCards/FilterButton';

export const ShowPacksCards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);
  let packsOwnLS = getLocalStorage('PacksOwn') as packsOwn;

  packsOwnLS = packsOwnLS === null ? packsOwn.ALL : packsOwnLS;

  const onClickButton = useCallback(
    (buttonName: packsOwn): void => {
      setLocalStorage('PacksOwn', buttonName);
      dispatch(
        changeFilterByOwn({ userId: buttonName === packsOwn.MY ? userId : undefined }),
      );
      dispatch(changePacksPage({ page: undefined }));
    },
    [dispatch, userId],
  );

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
    <Grid item className={styles.searchContainer}>
      <Typography className={styles.title}>Show packs cards</Typography>
      <ButtonGroup>{buttons}</ButtonGroup>
    </Grid>
  );
};
