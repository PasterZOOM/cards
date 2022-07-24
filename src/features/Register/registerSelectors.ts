import { AppRootStateType } from 'types/AppRootStateTypes';

export const getRegisterButtonActive = (state: AppRootStateType): boolean =>
  state.register.registerButtonActive;
export const getRegistered = (state: AppRootStateType): boolean =>
  state.register.isRegistered;
