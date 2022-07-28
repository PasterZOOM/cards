import { setAppError, setAppInfo, setAppStatus } from 'app/appReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeEmail, changeRedirect } from 'features/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Login/authReducer';
import { sendUserDate } from 'features/Profile/profileReducer';

export type AppActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppInfo>
  | ReturnType<typeof changeEmail>
  | ReturnType<typeof changeRedirect>;
