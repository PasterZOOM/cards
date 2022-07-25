import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { RegisterParamsType } from 'features/Register/RegisterTypes';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  isRegistered: true,
  disabledButton: false,
  disabledField: false,
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeRegisterStatus: (state, action: PayloadAction<{ isRegistered: boolean }>) => {
      state.isRegistered = action.payload.isRegistered;
    },
    changeDisabledButton: (state, action: PayloadAction<{ disabledButton: boolean }>) => {
      state.disabledButton = action.payload.disabledButton;
    },
    changeDisabledField: (state, action: PayloadAction<{ disabledField: boolean }>) => {
      state.disabledField = action.payload.disabledField;
    },
  },
});

export const registerReducer = slice.reducer;
export const { changeRegisterStatus, changeDisabledButton, changeDisabledField } =
  slice.actions;

export const createUser =
  (data: RegisterParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      dispatch(changeDisabledButton({ disabledButton: true }));
      dispatch(changeDisabledField({ disabledField: true }));
      await cardsAPI.register(data);
      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(changeRegisterStatus({ isRegistered: true }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));
        dispatch(setAppStatus({ status: requestStatus.FAILED }));
      } else {
        dispatch(setAppError({ error: `Native error ${err.message}` }));
        dispatch(setAppStatus({ status: requestStatus.FAILED }));
      }
    } finally {
      dispatch(changeDisabledButton({ disabledButton: false }));
      dispatch(changeDisabledField({ disabledField: false }));
    }
  };
