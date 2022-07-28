import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { repairPassword } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';

export const sendEmail = createAsyncThunk(
  'forgot/sendEmail',
  async (email: string, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      await repairPassword.sendEmail({
        email,
        from: 'test-front-admin <pasterzoom@gmail.com',
        message: `<div style='padding: 15px'>
password recovery link: 
<a href='http://localhost:3000/createNewPassword/$token$'>
link</a>
</div>`,
      });

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(changeEmail({ email }));
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
      await repairPassword.sendNewPassword(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
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
  initialState: { email: undefined as string | undefined },
  reducers: {
    changeEmail: (state, action: PayloadAction<{ email: string | undefined }>) => {
      state.email = action.payload.email;
    },
  },
});

export const forgotReducer = slice.reducer;
export const { changeEmail } = slice.actions;
