import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './appReducer';

import { forgotReducer } from 'features/Auth/Forgot/forgotReducer';
import { authReducer } from 'features/Auth/User/Login/authReducer';
import { profileReducer } from 'features/Auth/User/Profile/profileReducer';
import { registerReducer } from 'features/Auth/User/Register/registerReducer';
import { packsOptionsReducer } from 'features/Cards/Packs/Options/paksOptionsReducer';
import { packsReducer } from 'features/Cards/Packs/packsReducer';

export const rootReducer = combineReducers({
  register: registerReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  forgot: forgotReducer,
  packs: packsReducer,
  packsOptions: packsOptionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
