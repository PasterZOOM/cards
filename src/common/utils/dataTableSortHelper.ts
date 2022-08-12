import { URLSearchParamsInit } from 'react-router-dom';

import {
  CardData,
  DataKeys,
  Order,
  PackData,
} from 'common/components/DataTable/DataTableTypes';
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

  if (property === 'name') {
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

  if (property === 'updated') {
    if (order === 'asc') {
      queryParams.sortPacks = sortPacks.ASC_UPDATE;
    } else {
      queryParams.sortPacks = sortPacks.DESC_UPDATE;
    }
  }

  if (property === 'user_name') {
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

  if (property === 'updated') {
    if (order === 'asc') {
      queryParams.sortCards = sortCards.ASC_UPDATE;
    } else {
      queryParams.sortCards = sortCards.DESC_UPDATE;
    }
  }

  if (property === 'grade') {
    if (order === 'asc') {
      queryParams.sortCards = sortCards.ASC_GRADE;
    } else {
      queryParams.sortCards = sortCards.DESC_GRADE;
    }
  }

  searchParams.delete('page');

  setSearchParams({
    ...Object.fromEntries(searchParams),
    ...queryParams,
  });
};

// This functions generates initial sort direction values for the current table from search params (needs after reloading page to save actual data)

export const setCurrentOrder = (searchParams: string): Order => {
  if (searchParams) {
    if (+searchParams[0] === 1) {
      return 'desc';
    }

    return 'asc';
  }

  return 'asc';
};

export const setCurrentOrderBy = (searchParams: string): DataKeys => {
  if (searchParams) {
    return searchParams.substring(1) as DataKeys;
  }

  return 'updated';
};
