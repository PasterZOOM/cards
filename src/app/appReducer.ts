import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authAPI } from 'api/authAPI';
import { SnackbarType } from 'app/AppTypes';
import { requestStatus } from 'common/enums/requestStatus';
import { snackbarType } from 'common/enums/snackbarType';
import { handleError } from 'common/utils/handleError';
import { changeLoggedIn } from 'features/Auth/User/Login/authReducer';
import { sendUserDate } from 'features/Auth/User/Profile/profileReducer';

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (param, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await authAPI.me();

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(sendUserDate(res.data));
      dispatch(changeLoggedIn({ isLoggedIn: true }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState: {
    status: requestStatus.LOADING,
    snackbar: {} as SnackbarType,
    isInitialized: false,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: requestStatus }>) {
      state.status = action.payload.status;
    },
    setAppSnackbarValue(
      state,
      action: PayloadAction<{ type: snackbarType | undefined; message: string | null }>,
    ) {
      state.snackbar = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, state => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setAppSnackbarValue } = slice.actions;
