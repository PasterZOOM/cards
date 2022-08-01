import React from 'react';

import Grid from '@mui/material/Grid/Grid';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { NumberOfCards } from 'features/Cards/CardPacks/CardPacksParams/NumberOfCards/NumberOfCards';
import { OwnCardPacks } from 'features/Cards/CardPacks/CardPacksParams/OwnCardPacks/OwnCardPacks';
import { SearchCardPacks } from 'features/Cards/CardPacks/CardPacksParams/SearchCardPacks/SearchCardPacks';

export const CardPacksParams = (): ReturnComponentType => {
  return (
    <Grid item container justifyContent="space-between">
      <SearchCardPacks />
      <OwnCardPacks />
      <NumberOfCards />
    </Grid>
  );
};
