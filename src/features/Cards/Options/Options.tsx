import React from 'react';

import { NumberOfCards } from './NumberOfCards/NumberOfCards';
import { SearchCardPacks } from './SearchCardPacks/SearchCardPacks';
import { ShowPacksCards } from './ShowPacksCards/ShowPacksCards';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Options = (): ReturnComponentType => {
  return (
    <>
      <SearchCardPacks />
      <ShowPacksCards />
      <NumberOfCards />
    </>
  );
};
