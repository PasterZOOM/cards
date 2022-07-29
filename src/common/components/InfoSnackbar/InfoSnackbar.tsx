import React, { useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { SlideProps } from '@mui/material/Slide/Slide';
import Snackbar from '@mui/material/Snackbar';
import { Dispatch } from '@reduxjs/toolkit';

import { setAppSnackbarValue } from 'app/appReducer';
import { getAppSnackbar } from 'app/appSelectors';
import { SnackbarType } from 'app/AppTypes';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

const handleClose =
  (dispatch: Dispatch) => (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppSnackbarValue({ type: undefined, message: null }));
  };

const Transition =
  (dispatch: Dispatch, snackbar: SnackbarType) =>
  (props: TransitionProps): React.ReactElement => {
    return (
      <Slide {...props} direction="left">
        <Alert
          onClose={handleClose(dispatch)}
          severity={snackbar.type}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Slide>
    );
  };

export const InfoSnackbar = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector(getAppSnackbar);

  useEffect(() => {
    if (snackbar.message === 'you are not authorized /ᐠ-ꞈ-ᐟ\\')
      dispatch(setAppSnackbarValue({ type: undefined, message: null }));
  }, [dispatch, snackbar]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!snackbar.message}
      autoHideDuration={4000}
      onClose={handleClose(dispatch)}
      TransitionComponent={Transition(dispatch, snackbar)}
    />
  );
};
