import React from 'react';

import { Search } from 'common/components/Search/Search';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { ClearParams } from 'features/Cards/Packs/CardPacksParams/ClearParams/ClearParams';
import { NumberOfCards } from 'features/Cards/Packs/CardPacksParams/NumberOfCards/NumberOfCards';
import { OwnPacks } from 'features/Cards/Packs/CardPacksParams/OwnPacks/OwnPacks';
import styles from 'features/Cards/Packs/CardPacksParams/PacksParams.module.scss';

export const PacksParams = (): ReturnComponentType => {
  return (
    <div className={styles.main}>
      <Search search="packName" />
      <OwnPacks />
      <NumberOfCards />
      <ClearParams />
    </div>
  );
};
