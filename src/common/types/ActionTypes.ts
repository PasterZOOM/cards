import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { changeTheme, toggleAutoTheme } from 'app/themeReducer';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';
import { setCardsParams } from 'features/Cards/Cards/CardsParams/cardsParamsReducer';
import { setCardPacksParams } from 'features/Cards/Packs/PacksParams/packsParamsReducer';
import {
  initMessagesHandle,
  newMessageSandHandle,
  setOldScrollPosition,
} from 'features/Chat/chatReducer';
import { closeModal, openModal } from 'features/Modal/modalReducer';

export type AppActionsType =
  | ReturnType<typeof changeLoggedIn>
  | ReturnType<typeof changeTheme>
  | ReturnType<typeof toggleAutoTheme>
  | ReturnType<typeof sendUserDate>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppSnackbarValue>
  | ReturnType<typeof setCardPacksParams>
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof initMessagesHandle>
  | ReturnType<typeof newMessageSandHandle>
  | ReturnType<typeof setOldScrollPosition>
  | ReturnType<typeof setCardsParams>;
