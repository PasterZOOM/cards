import { setAppError, setAppStatus } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeEmail } from 'features/Forgot/forgotReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type SetAppStatusAT = ReturnType<typeof setAppStatus>;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type changeEmailAT = ReturnType<typeof changeEmail>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | SetAppStatusAT
  | SetAppErrorAT
  | changeEmailAT;
