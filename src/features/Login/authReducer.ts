import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginFormType } from './loginTypes';

import { cardsAPI } from 'api/api';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'loginization',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const loginReducer = slice.reducer;
export const { login } = slice.actions;

export const loginTC =
  (data: LoginFormType): AppThunkType =>
  dispatch => {
    dispatch(setAppStatus({ status: requestStatus.LOADING }));
    cardsAPI
      .login(data)
      .then(() => {
        dispatch(login({ isLoggedIn: true }));
        dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      })
      .catch(() => {});
  };
