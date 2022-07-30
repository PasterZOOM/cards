import React from 'react';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { NumberOfCards } from 'features/Cards/Packs/Options/NumberOfCards/NumberOfCards';
import { SearchCardPacks } from 'features/Cards/Packs/Options/SearchCardPacks/SearchCardPacks';
import { ShowPacksCards } from 'features/Cards/Packs/Options/ShowPacksCards/ShowPacksCards';

export const Options = (): ReturnComponentType => {
  return (
    <>
      <SearchCardPacks />
      <ShowPacksCards />
      <NumberOfCards />
    </>
  );
};
