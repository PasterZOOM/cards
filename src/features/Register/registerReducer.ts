import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userAPI } from 'api/api';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'enums/requestStatus';
import { login } from 'features/Login/authReducer';
import { NewUserType, RegisterParamsType } from 'features/Register/RegisterTypes';
import { handleError } from 'utils/handleError';

export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterParamsType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await userAPI.register({ ...data, email: data.email.toLowerCase() });

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(login({ ...data, rememberMe: false }));

      return res.data.addedUser;
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);

const slice = createSlice({
  name: 'register',
  initialState: {} as NewUserType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const registerReducer = slice.reducer;
