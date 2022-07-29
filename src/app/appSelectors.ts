import { AppRootStateType } from 'app/AppRootStateTypes';
import { SnackbarType } from 'app/AppTypes';
import { requestStatus } from 'common/enums/requestStatus';

export const getInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
export const getAppStatus = (state: AppRootStateType): requestStatus => state.app.status;
export const getAppSnackbar = (state: AppRootStateType): SnackbarType =>
  state.app.snackbar;
