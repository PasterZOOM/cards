import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './appReducer';

import { forgotReducer } from 'features/Auth/Forgot/forgotReducer';
import { authReducer } from 'features/Auth/Login/authReducer';
import { registerReducer } from 'features/Auth/Register/registerReducer';
import { profileReducer } from 'features/Profile/profileReducer';

export const rootReducer = combineReducers({
  register: registerReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  forgot: forgotReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
