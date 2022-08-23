import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { repairPasswordAPI } from 'api/authAPI';
import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { snackbarType } from 'common/enums/snackbarType';
import { handleError } from 'common/utils/handleError';
import { NewPasswordRequestType } from 'features/Auth/Forgot/ForgotPassword/ForgotPasswordTypes';
import { letter } from 'features/Auth/Forgot/letter';

export const sendEmail = createAsyncThunk(
  'forgot/sendEmail',
  async (email: string, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await repairPasswordAPI.sendEmail({
        email,
        from: 'test-front-admin <pasterzoom@gmail.com',
        message: letter,
      });

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(
        setAppSnackbarValue({ type: snackbarType.SUCCESS, message: res.data.info }),
      );

      return { email };
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);
export const sendNewPassword = createAsyncThunk(
  'forgot/sendNewPassword',
  async (param: NewPasswordRequestType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await repairPasswordAPI.sendNewPassword(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
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
  initialState: { email: 'your email' as string | undefined, redirect: false },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      if (action.payload !== undefined) state.email = action.payload.email;
    });
  },
});

export const forgotReducer = slice.reducer;
