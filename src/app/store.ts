import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './appReducer';

import { loginReducer } from 'features/Login/authReducer';
import { profileReducer } from 'features/Profile/profileReducer';
import { registerReducer } from 'features/Register/registerReducer';

export const rootReducer = combineReducers({
  register: registerReducer,
  app: appReducer,
  login: loginReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
