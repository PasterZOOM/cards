import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeEmail, changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Auth/Login/authReducer';
import { sendUserDate } from 'features/Profile/profileReducer';

export type AppActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof changeEmail>
  | ReturnType<typeof changeRedirect>;
