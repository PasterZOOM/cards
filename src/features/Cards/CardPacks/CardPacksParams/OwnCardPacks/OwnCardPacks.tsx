import React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import Typography from '@mui/material/Typography/Typography';
import { useSearchParams } from 'react-router-dom';

import styles from './OwnCardPacks.module.scss';

import { packsOwn } from 'common/enums/packsOwn';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { clearURLParams } from 'common/utils/clearURLParams';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { FilterButton } from 'features/Cards/CardPacks/CardPacksParams/OwnCardPacks/FilterButton/FilterButton';

export const OwnCardPacks = (): ReturnComponentType => {
  const [searchParams, setSearchParams] = useSearchParams();

  const userId = useAppSelector(getUserId);
  const packsOwnLS = searchParams.get('user_id') ? packsOwn.MY : packsOwn.ALL;

  const onClickButton = (buttonName: packsOwn): void => {
    const queryParams: { user_id?: string } = {};

    if (buttonName === packsOwn.MY) queryParams.user_id = userId;
    else searchParams.delete('user_id');

    clearURLParams(['page', 'min', 'max'], searchParams);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    });
  };

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
