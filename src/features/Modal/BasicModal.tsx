import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography/Typography';

import styles from './BasicModal.module.scss';

import closeIcon from 'assets/images/closeIcon.svg';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'features/Modal/modalReducer';

type PropsType = {
  children?: ReturnComponentType;
  title: string | null;
};

export const BasicModal: React.FC<PropsType> = ({ children, title }) => {
  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Modal open={!!title} onClose={onClose} sx={{ zIndex: 1 }}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Typography className={styles.title}>{title}</Typography>
          <IconButton onClick={onClose}>
            <img src={closeIcon} alt="close" />
          </IconButton>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </Modal>
  );
};
