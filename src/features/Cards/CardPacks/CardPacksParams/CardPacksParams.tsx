import React from 'react';

import styles from './CardPacksParams.module.scss';

import { Search } from 'common/components/Search/Search';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { changeSearchValue } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { NumberOfCards } from 'features/Cards/CardPacks/CardPacksParams/NumberOfCards/NumberOfCards';
import { OwnCardPacks } from 'features/Cards/CardPacks/CardPacksParams/OwnCardPacks/OwnCardPacks';

export const CardPacksParams = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const callBack = (value: string): void => {
    dispatch(changeSearchValue({ packName: value || undefined }));
  };

  return (
    <div className={styles.main}>
      <Search callBack={callBack} />
      <OwnCardPacks />
      <NumberOfCards />
    </div>
  );
};
