import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'api/authAPI';
import { RegisterDataType } from 'api/DataTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { login } from 'features/Auth/User/Login/authReducer';

export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterDataType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      await authAPI.register({ ...data, email: data.email.toLowerCase() });

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(login({ ...data, rememberMe: false }));
    } catch (e) {
      handleError(e, dispatch);
    }
  },
);
