import React, { useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop/Backdrop';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import styles from './App.module.scss';

import { initializeApp } from 'app/appReducer';
import { getAppStatus, getInitialized } from 'app/appSelectors';
import { Header } from 'common/components/Header/Header';
import { InfoSnackbar } from 'common/components/InfoSnackbar/InfoSnackbar';
import { RoutesPage } from 'common/components/RoutesPage/RoutesPage';
import { requestStatus } from 'common/enums/requestStatus';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  const isInitialized = useAppSelector(getInitialized);
  const status = useAppSelector(getAppStatus);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  useEffect(() => {
    if (status === requestStatus.LOADING) setOpen(true);
    else setOpen(false);
  }, [status]);

  if (!isInitialized) {
    return (
      <div className={styles.initialized}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Backdrop open={open} className={styles.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <InfoSnackbar />
      <Header />
      <RoutesPage />
    </div>
  );
};
