import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { setAppSnackbarValue, setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { snackbarType } from 'common/enums/snackbarType';

export const handleError = (error: unknown, dispatch: Dispatch): void => {
  const err = error as Error | AxiosError<{ error: string }>;

  dispatch(setAppStatus({ status: requestStatus.FAILED }));
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;

    dispatch(setAppSnackbarValue({ type: snackbarType.ERROR, message: error }));

    return;
  }
  dispatch(
    setAppSnackbarValue({
      type: snackbarType.ERROR,
      message: `Native error ${err.message}`,
    }),
  );
};
