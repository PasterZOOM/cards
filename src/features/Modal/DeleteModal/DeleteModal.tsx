import React from 'react';

import Typography from '@mui/material/Typography/Typography';

import { MultiButton } from 'common/components/Buttons/MultiButton/MultiButton';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'common/utils/modalUtils';
import { deletePack } from 'features/Cards/Packs/packsReducer';
import styles from 'features/Modal/BasicModal.module.scss';
import style from 'features/Modal/DeleteModal/DeleteModal.module.scss';
import { getModalOpenStatus, getPackModal } from 'features/Modal/modalSelectors';

export const DeleteModal = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const packModal = useAppSelector(getPackModal);
  const open = useAppSelector(getModalOpenStatus);

  const deleteItem = async (): Promise<void> => {
    if (open === modal.DELETE_PACK) {
      await dispatch(deletePack(packModal._id));
      closeModal(dispatch);
    }

    if (open === modal.DELETE_CARD) {
      closeModal(dispatch);
    }
  };

  return (
    <div className={style.form}>
      <Typography className={styles.title}>
        Do you really want to remove <b>{packModal.name}</b>?
      </Typography>
      {open === modal.DELETE_PACK && (
        <Typography className={styles.title}>All cards will be deleted.</Typography>
      )}
      <div className={style.buttonContainer}>
        <MultiButton label="Cancel" onClick={() => closeModal(dispatch)} color="white" />
        <MultiButton label="Delete" onClick={deleteItem} color="red" />
      </div>
    </div>
  );
};
