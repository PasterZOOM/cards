import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { loginTC } from 'features/Login/authReducer';
import { NewUserType, RegisterParamsType } from 'features/Register/RegisterTypes';

export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterParamsType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.register({ ...data, email: data.email.toLowerCase() });

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(loginTC({ ...data, rememberMe: false }));

      return res.data.addedUser;
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
  name: 'register',
  initialState: {} as NewUserType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const registerReducer = slice.reducer;
