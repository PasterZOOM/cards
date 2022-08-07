import { CardPacksParamsType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCardPacksParams = (state: AppRootStateType): CardPacksParamsType =>
  state.cardPacksParams;
