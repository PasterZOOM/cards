import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { LoginFormType } from './loginTypes';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { sendUserDate } from 'features/Profile/profileReducer';
import { UserType } from 'features/Profile/ProfileTypes';

export const login = createAsyncThunk(
  'auth/login',
  async (param: LoginFormType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.login(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(sendUserDate(res.data));
      dispatch(changeLoggedIn({ isLoggedIn: true }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      dispatch(setAppStatus({ status: requestStatus.FAILED }));
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));

        return;
      }
      dispatch(setAppError({ error: `Native error ${err.message}` }));
    }
  },
);
export const logOut = createAsyncThunk('auth/logOut', async (param, { dispatch }) => {
  try {
    dispatch(setAppStatus({ status: requestStatus.LOADING }));
    await cardsAPI.logOut();
    dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    dispatch(sendUserDate({} as UserType));
    dispatch(changeLoggedIn({ isLoggedIn: false }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message;

      dispatch(setAppError({ error }));

      return;
    }
    dispatch(setAppError({ error: `Native error ${err.message}` }));
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    changeLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const { changeLoggedIn } = slice.actions;
