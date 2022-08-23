import React from 'react';

import styles from './UsersParams.module.scss';

import { ClearParams } from 'common/components/ClearParams/ClearParams';
import { NumberOfCards } from 'common/components/NumberOfCards/NumberOfCards';
import { Search } from 'common/components/Search/Search';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  getMaxPublicCardPacksCount,
  getMinPublicCardPacksCount,
} from 'features/Social/Users/usersSelectors';

export const UsersParams = (): ReturnComponentType => {
  const minCount = useAppSelector(getMinPublicCardPacksCount);
  const maxCount = useAppSelector(getMaxPublicCardPacksCount);
  const clearParams = ['min', 'max', 'sortUsers', 'page', 'pageCount'];

  return (
    <div className={styles.main}>
      <Search search="userName" />
      <NumberOfCards minCount={minCount} maxCount={maxCount} />
      <ClearParams params={clearParams} />
    </div>
  );
};
