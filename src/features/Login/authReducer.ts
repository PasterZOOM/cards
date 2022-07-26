import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { LoginFormType } from './loginTypes';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { setUserDataAC } from 'features/Profile/profileReducer';
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
      .then(res => {
        dispatch(login({ isLoggedIn: true }));
        dispatch(setUserDataAC({ user: res.data }));
        dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      })
      .catch(error => {
        const err = error as Error | AxiosError<{ error: string }>;

        if (axios.isAxiosError(err)) {
          const error = err.response?.data ? err.response.data.error : err.message;

          dispatch(setAppError({ error }));
          dispatch(setAppStatus({ status: requestStatus.FAILED }));
        } else {
          dispatch(setAppError({ error: `Native error ${err.message}` }));
          dispatch(setAppStatus({ status: requestStatus.FAILED }));
        }
      });
  };
