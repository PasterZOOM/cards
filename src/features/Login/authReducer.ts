import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginFormType } from './loginTypes';

import { cardsAPI } from 'api/api';
import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { snackbarType } from 'enums/snackbarType';
import { sendUserDate } from 'features/Profile/profileReducer';
import { UserType } from 'features/Profile/ProfileTypes';
import { handleError } from 'utils/handleError';

export const login = createAsyncThunk(
  'auth/login',
  async (param: LoginFormType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.login(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(sendUserDate(res.data));
      dispatch(changeLoggedIn({ isLoggedIn: true }));
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);
export const logOut = createAsyncThunk('auth/logOut', async (param, { dispatch }) => {
  try {
    dispatch(setAppStatus({ status: requestStatus.LOADING }));
    const res = await cardsAPI.logOut();

    dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    dispatch(sendUserDate({} as UserType));
    dispatch(changeLoggedIn({ isLoggedIn: false }));
    dispatch(setAppSnackbarValue({ type: snackbarType.SUCCESS, message: res.data.info }));
  } catch (e) {
    handleError(e, dispatch);
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    changeLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const { changeLoggedIn } = slice.actions;
