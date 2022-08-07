import { AppRootStateType } from 'app/AppRootStateTypes';
import { URLParamsType } from 'common/types/URLParamsType';

export const getCardPacksParams = (state: AppRootStateType): URLParamsType =>
  state.cardPacksParams;
