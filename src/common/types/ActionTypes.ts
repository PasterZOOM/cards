import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeThemeAC } from 'app/themeReducer';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';
import {
  changeFilterByOwn,
  changePacksPage,
  changePacksPageCount,
  changeSearchValue,
  changeValueMaxCardsCount,
  changeValueMinCardsCount,
  changeValueSortPacks,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { setPageCount, setPageNumber } from 'features/Cards/CardPacks/cardsPacksReducer';
import {
  changeCardPackId,
  changeCardQuestionSearchValue,
  changeValueSortCards,
} from 'features/Cards/Pack/packParams/packParamsReducer';
import { changePackName } from 'features/Cards/Pack/packReducer';

export type AppActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof changeRedirect>
  | ReturnType<typeof changeSearchValue>
  | ReturnType<typeof changeValueMinCardsCount>
  | ReturnType<typeof changeValueMaxCardsCount>
  | ReturnType<typeof changeValueSortPacks>
  | ReturnType<typeof changePacksPage>
  | ReturnType<typeof changePacksPageCount>
  | ReturnType<typeof changeFilterByOwn>
  | ReturnType<typeof setPageNumber>
  | ReturnType<typeof changeCardQuestionSearchValue>
  | ReturnType<typeof changePackName>
  | ReturnType<typeof changeCardPackId>
  | ReturnType<typeof setPageCount>
  | ReturnType<typeof changeValueSortCards>;
