import { CardType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getPackName = (state: AppRootStateType): string => state.pack.cardPackName;
export const getPackUserId = (state: AppRootStateType): string =>
  state.pack.cards.packUserId;
export const getCards = (state: AppRootStateType): Array<CardType> =>
  state.pack.cards.cards;

export const getCardsTotalCount = (state: AppRootStateType): number =>
  state.pack.cards.cardsTotalCount;
