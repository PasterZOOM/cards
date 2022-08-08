import { CardPacksParamsType } from 'api/cardsRequestTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCardPacksParams = (state: AppRootStateType): CardPacksParamsType =>
  state.cardPacksParams;
