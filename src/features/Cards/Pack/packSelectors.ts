import { CardType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getPackUserId = (state: AppRootStateType): string => state.pack.packUserId;
export const getCards = (state: AppRootStateType): Array<CardType> => state.pack.cards;
export const getCardsTotalCount = (state: AppRootStateType): number =>
  state.pack.cardsTotalCount;
