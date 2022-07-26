import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { buttonStatus } from 'enums/buttonStatus';
import { fieldStatus } from 'enums/fieldStatus';
import { requestStatus } from 'enums/requestStatus';
import { loginTC } from 'features/Login/authReducer';
import { RegisterParamsType } from 'features/Register/RegisterTypes';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  registerButtonStatus: buttonStatus.DISABLED,
  registerFieldsStatus: fieldStatus.ACTIVE,
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeRegisterButtonStatus: (
      state,
      action: PayloadAction<{ registerButtonStatus: buttonStatus }>,
    ) => {
      state.registerButtonStatus = action.payload.registerButtonStatus;
    },
    changeRegisterFieldStatus: (
      state,
      action: PayloadAction<{ registerFieldsStatus: fieldStatus }>,
    ) => {
      state.registerFieldsStatus = action.payload.registerFieldsStatus;
    },
  },
});

export const registerReducer = slice.reducer;
export const { changeRegisterButtonStatus, changeRegisterFieldStatus } = slice.actions;

export const createUser =
  (data: RegisterParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      dispatch(
        changeRegisterButtonStatus({ registerButtonStatus: buttonStatus.DISABLED }),
      );
      dispatch(changeRegisterFieldStatus({ registerFieldsStatus: fieldStatus.DISABLED }));

      await cardsAPI.register(data);
      dispatch(loginTC({ ...data, rememberMe: false }));
      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      dispatch(setAppStatus({ status: requestStatus.FAILED }));
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));
      } else {
        dispatch(setAppError({ error: `Native error ${err.message}` }));
      }
    } finally {
      dispatch(changeRegisterButtonStatus({ registerButtonStatus: buttonStatus.ACTIVE }));
      dispatch(changeRegisterFieldStatus({ registerFieldsStatus: fieldStatus.ACTIVE }));
    }
  };
