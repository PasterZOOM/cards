import * as React from 'react';
import { ReactElement } from 'react';

import Modal from '@mui/material/Modal';

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
};

export const BasicModal: React.FC<ModalPropsType> = ({
  children,
  open,
  handleClose,
}): ReturnComponentType => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>{children}</div>
      </Modal>
    </div>
  );
};
