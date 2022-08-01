import { CardPacksParamsType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCardPacksParams = (state: AppRootStateType): CardPacksParamsType =>
  state.cardPacksParams;
export const getPageCountCardPacksParams = (
  state: AppRootStateType,
): number | undefined => state.cardPacksParams.pageCount;
