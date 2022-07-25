import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { setAppErrorAC, setAppStatusAC } from '../../app/appReducer';

import { UserType } from './ProfileTypes';

import { cardsAPI } from 'api/api';
import { requestStatus } from 'enums/requestStatus';
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
    clearUserDataAC(state, action: PayloadAction<{ user: UserType }>) {
      state.user = action.payload.user;
    },
  },
});

export const profileReducer = slice.reducer;
export const { setUserDataAC, setUserNameAC, clearUserDataAC } = slice.actions;

// thunks
export const setUserTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC({ status: requestStatus.LOADING }));
    const userData = await cardsAPI.me();

    dispatch(setUserDataAC({ user: userData.data }));
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

export const changeUserNameTC =
  (name: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: requestStatus.LOADING }));
      await cardsAPI.changeUserName({
        name,
        avatar: '',
      });

      dispatch(setUserNameAC({ name }));
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

export const logOutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC({ status: requestStatus.LOADING }));
    await cardsAPI.logOut();

    dispatch(clearUserDataAC(initialState));
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
