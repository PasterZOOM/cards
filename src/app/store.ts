import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './appReducer';

import { forgotReducer } from 'features/Auth/Forgot/forgotReducer';
import { authReducer } from 'features/Auth/User/Login/authReducer';
import { profileReducer } from 'features/Auth/User/Profile/profileReducer';
import { registerReducer } from 'features/Auth/User/Register/registerReducer';
import { cardPacksParamsReducer } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { cardsPacksReducer } from 'features/Cards/CardPacks/cardsPacksReducer';
import { packParamsReducer } from 'features/Cards/Pack/packParams/packParamsReducer';
import { packReducer } from 'features/Cards/Pack/packReducer';

export const rootReducer = combineReducers({
  register: registerReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  forgot: forgotReducer,
  pack: packReducer,
  cardPacks: cardsPacksReducer,
  packParams: packParamsReducer,
  cardPacksParams: cardPacksParamsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
