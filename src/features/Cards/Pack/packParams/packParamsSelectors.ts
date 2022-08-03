import { PackParamsType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getPackParams = (state: AppRootStateType): PackParamsType =>
  state.packParams;
export const getCardsPackId = (state: AppRootStateType): string =>
  state.packParams.cardsPack_id;
