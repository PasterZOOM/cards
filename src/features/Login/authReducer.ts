import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { LoginFormType } from './loginTypes';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { logOut } from 'features/Profile/profileReducer';

export const login = createAsyncThunk(
  'auth/login',
  async (param: LoginFormType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.login(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(setAppError({ error: null }));

      return res.data;
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      dispatch(setAppStatus({ status: requestStatus.FAILED }));
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));

        return rejectWithValue(null);
      }
      dispatch(setAppError({ error: `Native error ${err.message}` }));

      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, state => {
      state.isLoggedIn = true;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = slice.reducer;
