import { URLSearchParamsInit } from 'react-router-dom';

import { CardData, Order, PackData } from 'common/components/DataTable/DataTableTypes';
import { sortCards } from 'common/enums/sortCards';
import { sortPacks } from 'common/enums/sortPacks';

export const sortPacksHelper = (
  property: keyof PackData,
  order: Order,
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined,
  ) => void,
  searchParams: URLSearchParams,
): void => {
  const queryParams: { sortPacks?: string } = {};

  if (property === 'packTitle') {
    if (order === 'asc') {
      queryParams.sortPacks = sortPacks.ASC_NAME;
    } else {
      queryParams.sortPacks = sortPacks.DESC_NAME;
    }
  }

  if (property === 'cardsCount') {
    if (order === 'asc') {
      queryParams.sortPacks = sortPacks.ASC_CARDS_COUNT;
    } else {
      queryParams.sortPacks = sortPacks.DESC_CARDS_COUNT;
    }
  }

  if (property === 'updatePackDate') {
    if (order === 'asc') {
      queryParams.sortPacks = sortPacks.ASC_UPDATE;
    } else {
      queryParams.sortPacks = sortPacks.DESC_UPDATE;
    }
  }

  if (property === 'creatorName') {
    if (order === 'asc') {
      queryParams.sortPacks = sortPacks.ASC_USER_NAME;
    } else {
      queryParams.sortPacks = sortPacks.DESC_USER_NAME;
    }
  }

  searchParams.delete('page');

  setSearchParams({
    ...Object.fromEntries(searchParams),
    ...queryParams,
  });
};

export const sortCardsHelper = (
  property: keyof CardData,
  order: Order,
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined,
  ) => void,
  searchParams: URLSearchParams,
): void => {
  const queryParams: { sortCards?: string } = {};

  if (property === 'updateCardDate') {
    if (order === 'asc') {
      queryParams.sortCards = sortCards.ASC_UPDATE;
    } else {
      queryParams.sortCards = sortCards.DESC_UPDATE;
    }
  }

  searchParams.delete('page');

  setSearchParams({
    ...Object.fromEntries(searchParams),
    ...queryParams,
  });
};
