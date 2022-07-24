import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { RegisterParamsType } from 'features/Register/RegisterTypes';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  isRegistered: false,
  registerButtonActive: false,
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    confirmRegister: (state, action: PayloadAction<{ isRegistered: boolean }>) => {
      state.isRegistered = action.payload.isRegistered;
    },
    toggleSubmitButton: (
      state,
      action: PayloadAction<{ registerButtonActive: boolean }>,
    ) => {
      state.registerButtonActive = action.payload.registerButtonActive;
    },
  },
});

export const registerReducer = slice.reducer;
export const { confirmRegister, toggleSubmitButton } = slice.actions;

export const createUser =
  (data: RegisterParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      dispatch(toggleSubmitButton({ registerButtonActive: false }));
      await cardsAPI.register(data);
      dispatch(confirmRegister({ isRegistered: true }));
      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      dispatch(toggleSubmitButton({ registerButtonActive: true }));
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));
        dispatch(setAppStatus({ status: requestStatus.FAILED }));
      } else {
        dispatch(setAppError({ error: `Native error ${err.message}` }));
        dispatch(setAppStatus({ status: requestStatus.FAILED }));
      }
    }
  };
