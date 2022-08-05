import { CardPacksParamsType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCardPacksParams = (state: AppRootStateType): CardPacksParamsType =>
  state.cardPacksParams;

export const getPageCardPacksParams = (state: AppRootStateType): number | undefined =>
  state.cardPacksParams.page;

export const getPageCountPacksParams = (state: AppRootStateType): number | undefined =>
  state.cardPacksParams.pageCount;

export const getUserIdPacksParams = (state: AppRootStateType): string | undefined =>
  state.cardPacksParams.user_id;
