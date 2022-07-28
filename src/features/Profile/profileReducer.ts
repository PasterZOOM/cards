import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { UserType } from './ProfileTypes';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { login } from 'features/Login/authReducer';
import { AppThunkType } from 'types/AppRootStateTypes';

const initialState = {
  user: {
    _id: '',
    email: '',
    rememberMe: false,
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    avatar: null as string | null,
  },
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserDataAC(state, action: PayloadAction<{ user: UserType }>) {
      state.user = action.payload.user;
    },
    setUserNameAC(state, action: PayloadAction<{ name: string }>) {
      state.user.name = action.payload.name;
    },
  },
});

export const profileReducer = slice.reducer;
export const { setUserDataAC, setUserNameAC } = slice.actions;

// thunks
export const changeUserNameTC =
  (name: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      await cardsAPI.changeUserName({
        name,
        avatar: '',
      });

      dispatch(setUserNameAC({ name }));
      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));
      } else {
        dispatch(setAppError({ error: `Native error ${err.message}` }));
      }
    }
  };

export const logOutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatus({ status: requestStatus.LOADING }));
    await cardsAPI.logOut();

    dispatch(setUserDataAC(initialState));
    dispatch(login({ isLoggedIn: false }));
    dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message;

      dispatch(setAppError({ error }));
    } else {
      dispatch(setAppError({ error: `Native error ${err.message}` }));
    }
  }
};
