import { AppRootStateType } from 'types/AppRootStateTypes';

export const getIsLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn;
