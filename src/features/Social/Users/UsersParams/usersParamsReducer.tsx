import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UsersParamsType } from 'api/DataTypes';

const slice = createSlice({
  name: 'usersPacksParams',
  initialState: {
    userName: undefined,
    min: undefined,
    max: undefined,
    sortUsers: undefined,
    page: undefined,
    pageCount: undefined,
  } as UsersParamsType,
  reducers: {
    setUsersParams: (state, action: PayloadAction<UsersParamsType>) => {
      return action.payload;
    },
  },
});

export const usersParamsReducer = slice.reducer;
export const { setUsersParams } = slice.actions;
