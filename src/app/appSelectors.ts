import { AppRootStateType } from 'types/AppRootStateTypes';

export const getInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
