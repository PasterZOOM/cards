import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from './ProfileTypes';

import { cardsAPI } from 'api/api';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { handleError } from 'utils/handleError';

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (param: { name: string; avatar: string }, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardsAPI.changeUserName(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.updatedUser;
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);

const slice = createSlice({
  name: 'profile',
  initialState: { user: {} as UserType },
  reducers: {
    sendUserDate: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) state.user = action.payload;
    });
  },
});

export const profileReducer = slice.reducer;
export const { sendUserDate } = slice.actions;
