import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeTheme, toggleAutoTheme } from 'app/themeReducer';
import { changeRedirect } from 'features/Auth/Forgot/forgotReducer';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';
import { setCardsParams } from 'features/Cards/Cards/CardsParams/cardsParamsReducer';
import { setLearnParams } from 'features/Cards/Learn/learnReducer';
import { setCardPacksParams } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';
import { closeModal, openModal } from 'features/Modal/modalReducer';

export type AppActionsType =
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof changeTheme>
  | ReturnType<typeof toggleAutoTheme>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof changeRedirect>
  | ReturnType<typeof setCardPacksParams>
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof setLearnParams>
  | ReturnType<typeof setCardsParams>;
