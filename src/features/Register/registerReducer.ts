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
  disabledField: false,
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
    changeDisabledField: (state, action: PayloadAction<{ disabledField: boolean }>) => {
      state.disabledField = action.payload.disabledField;
    },
  },
});

export const registerReducer = slice.reducer;
export const { confirmRegister, toggleSubmitButton, changeDisabledField } = slice.actions;

export const createUser =
  (data: RegisterParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      dispatch(toggleSubmitButton({ registerButtonActive: false }));
      dispatch(changeDisabledField({ disabledField: true }));
      await cardsAPI.register(data);
      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(confirmRegister({ isRegistered: true }));
      dispatch(changeDisabledField({ disabledField: false }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      dispatch(toggleSubmitButton({ registerButtonActive: true }));
      dispatch(changeDisabledField({ disabledField: false }));
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
