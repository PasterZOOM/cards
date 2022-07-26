import { setAppError, setAppStatus, setIsInitialized } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import { login } from 'features/Login/authReducer';
import {
  setUserDataAC,
  setUserNameAC,
  clearUserDataAC,
} from 'features/Profile/profileReducer';
import {
  changeDisabledField,
  changeDisabledButton,
} from 'features/Register/registerReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type ToggleSubmitButtonType = ReturnType<typeof changeDisabledButton>;
export type ChangeDisabledFieldType = ReturnType<typeof changeDisabledField>;

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
  | ToggleSubmitButtonType
  | ChangeDisabledFieldType
  | SetLoginAT
  | setUserAT
  | setUserNameAT
  | clearUserDataAT;
