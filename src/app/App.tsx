import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';

import { initializeApp } from 'app/appReducer';
import { getAppStatus, getInitialized } from 'app/appSelectors';
import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { Header } from 'common/components/Header/Header';
import { Pages } from 'common/components/Pages/Pages';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { requestStatus } from 'enums/requestStatus';
import { Helper } from 'features/Helper/Helper';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  const isInitialized = useAppSelector(getInitialized);
  const status = useAppSelector(getAppStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {status === requestStatus.LOADING && (
        <LinearProgress style={{ position: 'fixed', top: '60px', width: '100%' }} />
      )}
      <ErrorSnackbar />
      <Header />
      <Pages />
      <Helper />
    </div>
  );
};
