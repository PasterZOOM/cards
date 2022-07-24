import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { setAppErrorAC, setAppStatusAC } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { RegisterParamsType } from 'features/Register/RegisterTypes';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  isRegistered: false,
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    confirmRegister: (state, action: PayloadAction<{ isRegistered: boolean }>) => {
      state.isRegistered = action.payload.isRegistered;
    },
  },
});

export const registerReducer = slice.reducer;
export const { confirmRegister } = slice.actions;

export const createUser =
  (data: RegisterParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: requestStatus.LOADING }));
      await cardsAPI.register(data);
      dispatch(confirmRegister({ isRegistered: true }));
      dispatch(setAppStatusAC({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppErrorAC({ error }));
        dispatch(setAppStatusAC({ status: requestStatus.FAILED }));
      } else {
        dispatch(setAppErrorAC({ error: `Native error ${err.message}` }));
        dispatch(setAppStatusAC({ status: requestStatus.FAILED }));
      }
    }
  };
