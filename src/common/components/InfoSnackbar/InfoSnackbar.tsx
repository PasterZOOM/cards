import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { SlideProps } from '@mui/material/Slide/Slide';
import Snackbar from '@mui/material/Snackbar';

import { setAppInfo } from 'app/appReducer';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

export const InfoSnackbar = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(state => state.app.info);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppInfo({ info: null }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!info}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionComponent={Transition}
    />
  );
};

const Transition = (props: TransitionProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(state => state.app.info);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppInfo({ info: null }));
  };

  return (
    <Slide {...props} direction="left">
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {info}
      </Alert>
    </Slide>
  );
};
