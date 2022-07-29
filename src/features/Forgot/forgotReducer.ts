import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { mail } from './mail';

import { repairPassword } from 'api/api';
import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { snackbarType } from 'enums/snackbarType';
import { handleError } from 'utils/handleError';

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
      dispatch(
        setAppSnackbarValue({ type: snackbarType.SUCCESS, message: res.data.info }),
      );
      dispatch(changeRedirect({ redirect: true }));

      return { email };
    } catch (e) {
      handleError(e, dispatch);
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
      dispatch(
        setAppSnackbarValue({ type: snackbarType.SUCCESS, message: res.data.info }),
      );
    } catch (e) {
      handleError(e, dispatch);
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
  extraReducers: builder => {
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.email = action.payload.email;
    });
  },
});

export const forgotReducer = slice.reducer;
export const { changeEmail, changeRedirect } = slice.actions;
