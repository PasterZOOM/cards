import { login } from '../features/Login/authReducer';

import { setAppErrorAC, setAppStatusAC, setIsInitializedAC } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import {
  changeDisabledField,
  confirmRegister,
  toggleSubmitButton,
} from 'features/Register/registerReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type ConfirmRegisterType = ReturnType<typeof confirmRegister>;
export type ToggleSubmitButtonType = ReturnType<typeof toggleSubmitButton>;
export type ChangeDisabledFieldType = ReturnType<typeof changeDisabledField>;

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>;
export type SetLogin = ReturnType<typeof login>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | ConfirmRegisterType
  | SetAppStatusAT
  | SetAppErrorAT
  | SetIsInitializedAT
  | ToggleSubmitButtonType
  | ChangeDisabledFieldType
  | SetLogin;
