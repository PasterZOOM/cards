import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography/Typography';

import closeIcon from 'assets/images/closeIcon.svg';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'common/utils/modalUtils';
import styles from 'features/Modal/BasicModal.module.scss';
import { DeleteModal } from 'features/Modal/DeleteModal/DeleteModal';
import { getModalOpenStatus, getTitle } from 'features/Modal/modalSelectors';
import { PackModal } from 'features/Modal/PackModal/PackModal';

export const BasicModal = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const open = useAppSelector(getModalOpenStatus);
  const title = useAppSelector(getTitle);

  const onCloseHandle = (): void => closeModal(dispatch);

  return (
    <Modal open={!!open} onClose={onCloseHandle} sx={{ zIndex: 1 }}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Typography className={styles.title}>{title}</Typography>
          <IconButton onClick={onCloseHandle}>
            <img src={closeIcon} alt="close" />
          </IconButton>
        </div>
        <div className={styles.body}>
          {(open === modal.CREATE_PACK || open === modal.UPDATE_PACK) && <PackModal />}
          {open === modal.DELETE_PACK && <DeleteModal />}
        </div>
      </div>
    </Modal>
  );
};
