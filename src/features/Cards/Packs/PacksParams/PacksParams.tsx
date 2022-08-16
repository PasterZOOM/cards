import React from 'react';

import styles from './PacksParams.module.scss';

import { ClearParams } from 'common/components/ClearParams/ClearParams';
import { NumberOfCards } from 'common/components/NumberOfCards/NumberOfCards';
import { OwnPacks } from 'common/components/OwnPacks/OwnPacks';
import { Search } from 'common/components/Search/Search';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getMaxCardsCount, getMinCardsCount } from 'features/Cards/Packs/packsSelectors';

export const PacksParams = (): ReturnComponentType => {
  const minCount = useAppSelector(getMinCardsCount);
  const maxCount = useAppSelector(getMaxCardsCount);
  const clearParams = [
    'page',
    'user_id',
    'packName',
    'min',
    'max',
    'sortPacks',
    'pageCount',
  ];

  return (
    <div className={styles.main}>
      <Search search="packName" />
      <OwnPacks />
      <NumberOfCards maxCount={maxCount} minCount={minCount} />
      <ClearParams params={clearParams} />
    </div>
  );
};
