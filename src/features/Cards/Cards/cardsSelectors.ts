import { CardType } from 'api/ResponseTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCards = (state: AppRootStateType): Array<CardType> => state.cards.cards;
export const getCardsPackUserId = (state: AppRootStateType): string =>
  state.cards.packUserId;
export const getCardsTotalCount = (state: AppRootStateType): number =>
  state.cards.cardsTotalCount;
export const getPackName = (state: AppRootStateType): string => state.cards.packName;
export const getPackPrivate = (state: AppRootStateType): boolean =>
  state.cards.packPrivate;
export const getPackDeckCover = (state: AppRootStateType): string =>
  state.cards.packDeckCover;
