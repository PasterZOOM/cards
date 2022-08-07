import React from 'react';

import styles from './CardPacksParams.module.scss';

import { Search } from 'common/components/Search/Search';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { NumberOfCards } from 'features/Cards/CardPacks/CardPacksParams/NumberOfCards/NumberOfCards';
import { OwnCardPacks } from 'features/Cards/CardPacks/CardPacksParams/OwnCardPacks/OwnCardPacks';

export const CardPacksParams = (): ReturnComponentType => {
  return (
    <div className={styles.main}>
      <Search search="packName" />
      <OwnCardPacks />
      <NumberOfCards />
    </div>
  );
};
