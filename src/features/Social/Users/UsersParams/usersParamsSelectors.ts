import { UsersParamsType } from 'api/DataTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getUsersParams = (state: AppRootStateType): UsersParamsType =>
  state.usersParams;
