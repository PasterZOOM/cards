import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';
import { setCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { setPageCount, setPageNumber } from 'features/Cards/CardPacks/cardsPacksReducer';
import { setPacksParams } from 'features/Cards/Pack/PackParams/packParamsReducer';

export type AppActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof changeRedirect>
  | ReturnType<typeof setPageNumber>
  | ReturnType<typeof setCardPacksParams>
  | ReturnType<typeof setPacksParams>
  | ReturnType<typeof setPageCount>;
