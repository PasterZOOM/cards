import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { requestStatus } from 'enums/requestStatus';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  status: requestStatus.IDLE,
  error: null as string | null,
  isInitialized: true,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: requestStatus }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setAppError, setIsInitialized } = slice.actions;

// thunks
export const initializeApp = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus({ status: requestStatus.LOADING }));
    await cardsAPI.me;

    dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    dispatch(setIsInitialized({ isInitialized: true }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;

    dispatch(setIsInitialized({ isInitialized: true }));
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message;

      dispatch(setAppError({ error }));
    } else {
      dispatch(setAppError({ error: `Native error ${err.message}` }));
    }
  }
};
