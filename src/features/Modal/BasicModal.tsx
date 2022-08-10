import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography/Typography';

import closeIcon from 'assets/images/closeIcon.svg';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import styles from 'features/Modal/BasicModal.module.scss';
import { CardsModal } from 'features/Modal/CardsModal/CardsModal';
import { DeleteModal } from 'features/Modal/DeleteModal/DeleteModal';
import { closeModal } from 'features/Modal/modalReduscer';
import { getModalTitle } from 'features/Modal/modalSelectors';
import { PackModal } from 'features/Modal/PackModal/PackModal';

export const BasicModal = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(getModalTitle);

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
        <div className={styles.body}>
          {(title === modal.ADD_PACK || title === modal.EDIT_PACK) && <PackModal />}
          {(title === modal.ADD_CARD || title === modal.EDIT_CARD) && <CardsModal />}
          {(title === modal.DELETE_PACK || title === modal.DELETE_CARD) && (
            <DeleteModal />
          )}
        </div>
      </div>
    </Modal>
  );
};
