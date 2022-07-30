import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userAPI } from 'api/authAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { login } from 'features/Auth/User/Login/authReducer';
import {
  NewUserType,
  RegisterParamsType,
} from 'features/Auth/User/Register/RegisterTypes';

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
