import { setAppErrorAC, setAppStatusAC, setIsInitializedAC } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import { confirmRegistration } from 'faetures/Registration/registrationReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type ConfirmRegistrationType = ReturnType<typeof confirmRegistration>;

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>;
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | ConfirmRegistrationType
  | SetAppStatusAT
  | SetAppErrorAT
  | SetIsInitializedAT;
