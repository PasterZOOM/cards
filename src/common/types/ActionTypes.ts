import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';
import { setCardsParams } from 'features/Cards/Cards/CardsParams/cardsParamsReducer';
import { setCardPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';

export type AppActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof changeRedirect>
  | ReturnType<typeof setCardPacksParams>
  | ReturnType<typeof setCardsParams>;
