import { PacksParamsType } from 'api/DataTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getPacksParams = (state: AppRootStateType): PacksParamsType =>
  state.packsParams;
