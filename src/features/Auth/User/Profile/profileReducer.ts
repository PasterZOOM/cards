import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userAPI } from 'api/authAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { UserType } from 'features/Auth/User/Profile/ProfileTypes';

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (param: { name: string; avatar: string }, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await userAPI.changeUserName(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.updatedUser;
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);

const slice = createSlice({
  name: 'profile',
  initialState: {
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
      avatar: '',
    } as UserType,
  },
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
