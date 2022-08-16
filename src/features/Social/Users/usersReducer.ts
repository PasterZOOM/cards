import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UsersParamsType } from 'api/DataTypes';
import { GetUsersResponseType } from 'api/ResponseTypes';
import { usersAPI } from 'api/usersAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const loadUsers = createAsyncThunk(
  'users/loadUsers',
  async (param: UsersParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await usersAPI.getUsers(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [
      {
        _id: '',
        email: '',
        isAdmin: false,
        name: '',
        verified: false,
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        avatar: null,
      },
    ],
    page: 0,
    pageCount: 0,
    usersTotalCount: 0,
    minPublicCardPacksCount: 0,
    maxPublicCardPacksCount: 0,
  } as GetUsersResponseType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const usersReducer = slice.reducer;
