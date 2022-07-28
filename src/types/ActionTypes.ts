import { setAppError, setAppStatus } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import { login } from 'features/Login/authReducer';
import { setUserDataAC, setUserNameAC } from 'features/Profile/profileReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type SetAppStatusAT = ReturnType<typeof setAppStatus>;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type SetLoginAT = ReturnType<typeof login>;
export type setUserAT = ReturnType<typeof setUserDataAC>;
export type setUserNameAT = ReturnType<typeof setUserNameAC>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | SetAppStatusAT
  | SetAppErrorAT
  | SetLoginAT
  | setUserAT
  | setUserNameAT;
