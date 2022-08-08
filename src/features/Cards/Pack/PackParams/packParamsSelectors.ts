import { PackParamsType } from 'api/cardsRequestTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getPackParams = (state: AppRootStateType): PackParamsType =>
  state.packParams;
