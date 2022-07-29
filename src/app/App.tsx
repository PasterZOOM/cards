import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';

import { initializeApp } from 'app/appReducer';
import { getAppStatus, getInitialized } from 'app/appSelectors';
import { Header } from 'common/components/Header/Header';
import { Helper } from 'common/components/Helper/Helper';
import { InfoSnackbar } from 'common/components/InfoSnackbar/InfoSnackbar';
import { RoutesPage } from 'common/components/RoutesPage/RoutesPage';
import { requestStatus } from 'common/enums/requestStatus';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

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
      <InfoSnackbar />
      <Header />
      <RoutesPage />
      <Helper />
    </div>
  );
};
