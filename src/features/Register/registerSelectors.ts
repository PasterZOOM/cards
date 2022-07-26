import { AppRootStateType } from 'types/AppRootStateTypes';

export const getDisabledButton = (state: AppRootStateType): boolean =>
  state.register.disabledButton;

export const getDisabledField = (state: AppRootStateType): boolean =>
  state.register.disabledField;
