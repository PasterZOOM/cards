import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { requestStatus } from 'enums/requestStatus';
import { changeLoggedIn } from 'features/Login/authReducer';
import { sendUserDate } from 'features/Profile/profileReducer';

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (param, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.me();

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(sendUserDate(res.data));
      dispatch(changeLoggedIn({ isLoggedIn: true }));

      return res.data;
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
  name: 'app',
  initialState: {
    status: requestStatus.IDLE,
    error: null as string | null,
    info: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: requestStatus }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppInfo(state, action: PayloadAction<{ info: string | null }>) {
      state.info = action.payload.info;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, state => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setAppError, setAppInfo } = slice.actions;
