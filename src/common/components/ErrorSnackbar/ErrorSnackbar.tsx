import React, { useEffect } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { SlideProps } from '@mui/material/Slide/Slide';
import Snackbar from '@mui/material/Snackbar';

import { setAppError } from 'app/appReducer';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

export const ErrorSnackbar = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.app.error);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppError({ error: null }));
  };

  useEffect(() => {
    if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\')
      dispatch(setAppError({ error: null }));
  }, [dispatch, error]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!error}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={Transition}
    />
  );
};

const Transition = (props: TransitionProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.app.error);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppError({ error: null }));
  };

  return (
    <Slide {...props} direction="left">
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Slide>
  );
};
