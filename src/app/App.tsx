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
import { getModalChildren } from 'common/utils/getModalChildren';
import { BasicModal } from 'features/Modal/BasicModal';
import { getModalTitle } from 'features/Modal/modalSelectors';

export const App = (): ReturnComponentType => {
  const isInitialized = useAppSelector(getInitialized);
  const status = useAppSelector(getAppStatus);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const title = useAppSelector(getModalTitle);

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
      <Backdrop open={open} sx={{ color: '#fff', zIndex: 2 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />
      <RoutesPage />

      <BasicModal title={title}>{getModalChildren(title)}</BasicModal>
      <InfoSnackbar />
    </div>
  );
};
