import { AppRootStateType } from 'app/AppRootStateTypes';

export const getMaxCardsCount = (state: AppRootStateType): number =>
  state.cardPacks.maxCardsCount;
export const getMinCardsCount = (state: AppRootStateType): number =>
  state.cardPacks.minCardsCount;
export const getCardPacksTotalCount = (state: AppRootStateType): number =>
  state.cardPacks.cardPacksTotalCount;

export const getPageCount = (state: AppRootStateType): number =>
  state.cardPacks.pageCount;

export const getPageNumber = (state: AppRootStateType): number => state.cardPacks.page;