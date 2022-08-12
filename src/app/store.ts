import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './appReducer';

import { forgotReducer } from 'features/Auth/Forgot/forgotReducer';
import { authReducer } from 'features/Auth/User/Login/authReducer';
import { profileReducer } from 'features/Auth/User/Profile/profileReducer';
import { cardsParamsReducer } from 'features/Cards/Cards/CardsParams/cardsParamsReducer';
import { cardsReducer } from 'features/Cards/Cards/cardsReducer';
import { learnReducer } from 'features/Cards/Learn/learnReducer';
import { packsParamsReducer } from 'features/Cards/Packs/CardPacksParams/packsParamsReducer';
import { packsReducer } from 'features/Cards/Packs/packsReducer';
import { modalsReducer } from 'features/Modal/modalReduscer';

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
  learn: learnReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
