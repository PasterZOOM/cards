import { CardPackType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getMaxCardsCount = (state: AppRootStateType): number =>
  state.packs.maxCardsCount;
export const getMinCardsCount = (state: AppRootStateType): number =>
  state.packs.minCardsCount;
export const getCardPacksTotalCount = (state: AppRootStateType): number =>
  state.packs.cardPacksTotalCount;
export const getCardPacks = (state: AppRootStateType): Array<CardPackType> =>
  state.packs.cardPacks;

export const getPageCount = (state: AppRootStateType): number => state.packs.pageCount;

export const getPageNumber = (state: AppRootStateType): number => state.packs.page;
