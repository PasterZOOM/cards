import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeEmail, changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';
import {
  changeValueMaxCardsCount,
  changeValueMinCardsCount,
  changeSearchValue,
  changePacksPage,
  changePacksPageCount,
  changeValueSortPacks,
  changeFilterByOwn,
} from 'features/Cards/Packs/Options/paksOptionsReducer';
import { setPageNumber, setPageCount } from 'features/Cards/Packs/packsReducer';

export type AppActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof changeEmail>
  | ReturnType<typeof changeRedirect>
  | ReturnType<typeof changeSearchValue>
  | ReturnType<typeof changeValueMinCardsCount>
  | ReturnType<typeof changeValueMaxCardsCount>
  | ReturnType<typeof changeValueSortPacks>
  | ReturnType<typeof changePacksPage>
  | ReturnType<typeof changePacksPageCount>
  | ReturnType<typeof changeFilterByOwn>
  | ReturnType<typeof setPageNumber>
  | ReturnType<typeof setPageCount>;
