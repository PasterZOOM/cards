import { PackParamsType } from 'api/cardsAPI';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getPackParams = (state: AppRootStateType): PackParamsType =>
  state.packParams;
