import { UserType } from 'api/ResponseTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getUsers = (
  state: AppRootStateType,
): Array<Omit<UserType, 'rememberMe' | '__v'>> => state.users.users;
export const getUsersTotalCount = (state: AppRootStateType): number =>
  state.users.usersTotalCount;
export const getMinPublicCardPacksCount = (state: AppRootStateType): number =>
  state.users.minPublicCardPacksCount;
export const getMaxPublicCardPacksCount = (state: AppRootStateType): number =>
  state.users.maxPublicCardPacksCount;
