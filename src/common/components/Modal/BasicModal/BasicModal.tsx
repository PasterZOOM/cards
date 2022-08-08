import * as React from 'react';
import { ReactElement } from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal';

import styles from './BasicModal.module.scss';

import closeIcon from 'assets/images/closeIcon.svg';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  border: '2px solid #000',
};

type ModalPropsType = {
  children: ReactElement;
  open: boolean;
  handleClose: () => void;
  title: string;
};

export const BasicModal: React.FC<ModalPropsType> = ({
  children,
  open,
  handleClose,
  title,
}): ReturnComponentType => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <div className={styles.main}>
            <div className={styles.header}>
              <h3 className={styles.title}>{title}</h3>
              <IconButton
                className={styles.icon}
                onClick={() => {
                  handleClose();
                }}
              >
                <img src={closeIcon} alt="close" />
              </IconButton>
            </div>
            <div className={styles.line} />
            {children}
          </div>
        </div>
      </Modal>
    </div>
  );
};
