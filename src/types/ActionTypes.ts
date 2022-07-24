import { setAppError, setAppStatus, setIsInitialized } from 'app/appReducer';
import { loadingAC } from 'app/loadReducer';
import { changeThemeAC } from 'app/themeReducer';
import { confirmRegister, toggleSubmitButton } from 'features/Register/registerReducer';

export type ThemeReducerAT = ReturnType<typeof changeThemeAC>;

export type LoadingReducerAT = ReturnType<typeof loadingAC>;

export type ConfirmRegisterType = ReturnType<typeof confirmRegister>;
export type ToggleSubmitButtonType = ReturnType<typeof toggleSubmitButton>;

export type SetAppStatusAT = ReturnType<typeof setAppStatus>;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type SetIsInitializedAT = ReturnType<typeof setIsInitialized>;

export type AppActionsType =
  | ThemeReducerAT
  | LoadingReducerAT
  | ConfirmRegisterType
  | SetAppStatusAT
  | SetAppErrorAT
  | SetIsInitializedAT
  | ToggleSubmitButtonType;
