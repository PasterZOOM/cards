import { SnackbarType } from 'app/AppTypes';
import { requestStatus } from 'enums/requestStatus';
import { AppRootStateType } from 'types/AppRootStateTypes';

export const getInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
export const getAppStatus = (state: AppRootStateType): requestStatus => state.app.status;
export const getAppSnackbar = (state: AppRootStateType): SnackbarType =>
  state.app.snackbar;
