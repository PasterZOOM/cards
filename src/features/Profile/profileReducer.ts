import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { UserType } from './ProfileTypes';

import { cardsAPI } from 'api/api';
import { setAppError, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { login } from 'features/Login/authReducer';

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (param: { name: string; avatar: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.changeUserName(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.updatedUser;
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));

        return rejectWithValue(null);
      }
      dispatch(setAppError({ error: `Native error ${err.message}` }));

      return rejectWithValue(null);
    }
  },
);
export const logOut = createAsyncThunk(
  'profile/logOut',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      await cardsAPI.logOut();
      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(setAppError({ error }));

        return rejectWithValue(null);
      }
      dispatch(setAppError({ error: `Native error ${err.message}` }));

      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: 'profile',
  initialState: { user: {} as UserType },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.user = {} as UserType;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const profileReducer = slice.reducer;
