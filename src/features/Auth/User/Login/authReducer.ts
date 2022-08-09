import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userAPI } from 'api/authAPI';
import { LoginDataType } from 'api/DataTypes';
import { UserType } from 'api/ResponseTypes';
import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { snackbarType } from 'common/enums/snackbarType';
import { handleError } from 'common/utils/handleError';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';

export const login = createAsyncThunk(
  'auth/login',
  async (param: LoginDataType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await userAPI.login(param);

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
    const res = await userAPI.logOut();

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
