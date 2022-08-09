import { PacksParamsType } from 'api/DataTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCardPacksParams = (state: AppRootStateType): PacksParamsType =>
  state.packsParams;
