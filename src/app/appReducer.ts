import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { requestStatus } from 'enums/requestStatus';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  status: requestStatus.IDLE,
  error: null as string | null,
  isInitialized: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: requestStatus }>) {
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatusAC, setAppErrorAC, setIsInitializedAC } = slice.actions;

// thunks
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC({ status: requestStatus.LOADING }));
    await cardsAPI.me;
    dispatch(setAppStatusAC({ status: requestStatus.SUCCEEDED }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message;

      dispatch(setAppErrorAC({ error }));
    } else {
      dispatch(setAppErrorAC({ error: `Native error ${err.message}` }));
    }
  }
};
