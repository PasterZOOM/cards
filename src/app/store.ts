import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { profileReducer } from '../features/Profile/profileReducer';

import { appReducer } from './appReducer';

import { registerReducer } from 'features/Register/registerReducer';

export const rootReducer = combineReducers({
  register: registerReducer,
  app: appReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
