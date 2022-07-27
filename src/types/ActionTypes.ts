import { setAppError, setAppStatus, setIsInitialized } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import {
  changeForgotButtonStatus,
  changeForgotFieldStatus,
} from 'features/Forgot/ForgotPassword/forgotReducer';
import { login } from 'features/Login/authReducer';
import {
  clearUserDataAC,
  setUserDataAC,
  setUserNameAC,
} from 'features/Profile/profileReducer';
import {
  changeRegisterButtonStatus,
  changeRegisterFieldStatus,
} from 'features/Register/registerReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type ChangeRegisterButtonStatusType = ReturnType<
  typeof changeRegisterButtonStatus
>;
export type ChangeRegisterFieldStatusType = ReturnType<typeof changeRegisterFieldStatus>;

export type ChangeForgotButtonStatusType = ReturnType<typeof changeForgotButtonStatus>;
export type ChangeForgotFieldStatusType = ReturnType<typeof changeForgotFieldStatus>;

export type SetAppStatusAT = ReturnType<typeof setAppStatus>;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type SetIsInitializedAT = ReturnType<typeof setIsInitialized>;
export type SetLoginAT = ReturnType<typeof login>;
export type setUserAT = ReturnType<typeof setUserDataAC>;
export type setUserNameAT = ReturnType<typeof setUserNameAC>;
export type clearUserDataAT = ReturnType<typeof clearUserDataAC>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | SetAppStatusAT
  | SetAppErrorAT
  | SetIsInitializedAT
  | ChangeRegisterButtonStatusType
  | ChangeRegisterFieldStatusType
  | SetLoginAT
  | setUserAT
  | setUserNameAT
  | clearUserDataAT
  | ChangeForgotButtonStatusType
  | ChangeForgotFieldStatusType;
