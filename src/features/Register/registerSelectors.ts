import { AppRootStateType } from 'types/AppRootStateTypes';

export const getDisabledButton = (state: AppRootStateType): boolean =>
  state.register.disabledButton;
export const getRegistered = (state: AppRootStateType): boolean =>
  state.register.isRegistered;
export const getDisabledField = (state: AppRootStateType): boolean =>
  state.register.disabledField;
