import {
  setUserDataAC,
  setUserNameAC,
  clearUserDataAC,
} from '../features/Profile/profileReducer';

import { setAppErrorAC, setAppStatusAC, setIsInitializedAC } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import { confirmRegister } from 'features/Register/registerReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type ConfirmRegisterType = ReturnType<typeof confirmRegister>;

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>;
export type setUserAT = ReturnType<typeof setUserDataAC>;
export type setUserNameAT = ReturnType<typeof setUserNameAC>;
export type clearUserDataAT = ReturnType<typeof clearUserDataAC>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | ConfirmRegisterType
  | SetAppStatusAT
  | SetAppErrorAT
  | SetIsInitializedAT
  | setUserAT
  | setUserNameAT
  | clearUserDataAT;
