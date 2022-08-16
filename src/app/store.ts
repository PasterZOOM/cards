import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './appReducer';

import { forgotReducer } from 'features/Auth/Forgot/forgotReducer';
import { authReducer } from 'features/Auth/User/Login/authReducer';
import { profileReducer } from 'features/Auth/User/Profile/profileReducer';
import { cardsParamsReducer } from 'features/Cards/Cards/CardsParams/cardsParamsReducer';
import { cardsReducer } from 'features/Cards/Cards/cardsReducer';
import { packsParamsReducer } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';
import { packsReducer } from 'features/Cards/Packs/packsReducer';
import { modalsReducer } from 'features/Modal/modalReducer';
import { usersParamsReducer } from 'features/Social/Users/UsersParams/usersParamsReducer';
import { usersReducer } from 'features/Social/Users/usersReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  forgot: forgotReducer,
  cards: cardsReducer,
  cardsParams: cardsParamsReducer,
  packs: packsReducer,
  packsParams: packsParamsReducer,
  modals: modalsReducer,
  users: usersReducer,
  usersParams: usersParamsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
