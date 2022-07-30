import { AppRootStateType } from 'app/AppRootStateTypes';

export const getIsLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn;
