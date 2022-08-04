import { Dispatch } from '@reduxjs/toolkit';

import { CardData, Order, PackData } from 'common/components/DataTable/DataTableTypes';
import {
  changeValueSortPacks,
  sortPacks,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import {
  changeValueSortCards,
  sortCards,
} from 'features/Cards/Pack/packParams/packParamsReducer';

export const sortPacksHelper = (
  property: keyof PackData,
  order: Order,
  dispatch: Dispatch,
): void => {
  if (property === 'packTitle') {
    if (order === 'asc') {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_NAME }));
    } else {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_NAME }));
    }
  }

  if (property === 'cardsCount') {
    if (order === 'asc') {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_CARDS_COUNT }));
    } else {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_CARDS_COUNT }));
    }
  }

  if (property === 'updatePackDate') {
    if (order === 'asc') {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_UPDATE }));
    } else {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_UPDATE }));
    }
  }

  if (property === 'creatorName') {
    if (order === 'asc') {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_USER_NAME }));
    } else {
      dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_USER_NAME }));
    }
  }
};

export const sortCardsHelper = (
  property: keyof CardData,
  order: Order,
  dispatch: Dispatch,
): void => {
  if (property === 'updateCardDate') {
    if (order === 'asc') {
      dispatch(changeValueSortCards({ sortCards: sortCards.ASC_UPDATE }));
    } else {
      dispatch(changeValueSortCards({ sortCards: sortCards.DESC_UPDATE }));
    }
  }
};
