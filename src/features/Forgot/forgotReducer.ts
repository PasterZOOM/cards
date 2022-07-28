import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { mail } from './mail';

import { repairPassword } from 'api/api';
import { setAppError, setAppInfo, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';

export const sendEmail = createAsyncThunk(
  'forgot/sendEmail',
  async (email: string, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await repairPassword.sendEmail({
        email,
        from: 'test-front-admin <pasterzoom@gmail.com',
        message: mail,
      });

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(changeEmail({ email }));
      dispatch(changeRedirect({ redirect: true }));
      dispatch(setAppInfo({ info: res.data.info }));
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
export const sendNewPassword = createAsyncThunk(
  'forgot/sendNewPassword',
  async (param: { password: string; resetPasswordToken: string }, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await repairPassword.sendNewPassword(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(changeRedirect({ redirect: true }));
      dispatch(setAppInfo({ info: res.data.info }));
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

const slice = createSlice({
  name: 'forgot',
  initialState: { email: undefined as string | undefined, redirect: false },
  reducers: {
    changeEmail: (state, action: PayloadAction<{ email: string | undefined }>) => {
      state.email = action.payload.email;
    },
    changeRedirect: (state, action: PayloadAction<{ redirect: boolean }>) => {
      state.redirect = action.payload.redirect;
    },
  },
});

export const forgotReducer = slice.reducer;
export const { changeEmail, changeRedirect } = slice.actions;
