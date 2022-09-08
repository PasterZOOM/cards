import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AnotherUserType } from 'api/ResponseTypes';
import { usersAPI } from 'api/usersAPI';
import { handleError } from 'common/utils/handleError';

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const res = await usersAPI.getUser(id);

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    email: '',
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    avatar: null,
  } as AnotherUserType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      return action.payload.user;
    });
  },
});

export const userReducer = slice.reducer;
