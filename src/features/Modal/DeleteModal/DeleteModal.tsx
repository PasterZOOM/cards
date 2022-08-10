import React from 'react';

import Typography from '@mui/material/Typography/Typography';

import { DeleteParamType } from 'api/DataTypes';
import { MultiButton } from 'common/components/Buttons/MultiButton/MultiButton';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { deleteCard } from 'features/Cards/Cards/cardsReducer';
import { deletePack } from 'features/Cards/Packs/packsReducer';
import styles from 'features/Modal/BasicModal.module.scss';
import style from 'features/Modal/DeleteModal/DeleteModal.module.scss';
import { closeModal } from 'features/Modal/modalReduscer';
import { getModalTitle, getPackData } from 'features/Modal/modalSelectors';

export const DeleteModal = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getPackData) as DeleteParamType;
  const title = useAppSelector(getModalTitle);

  const onClose = (): void => {
    dispatch(closeModal());
  };

  const deleteItem = async (): Promise<void> => {
    if (title === modal.DELETE_PACK) {
      await dispatch(deletePack(data._id));
      onClose();
    }

    if (title === modal.DELETE_CARD) {
      await dispatch(deleteCard(data._id));
      onClose();
    }
  };

  return (
    <div className={style.form}>
      <Typography className={styles.title}>
        Do you really want to remove{' '}
        {title === modal.DELETE_PACK ? <b>{data.name}</b> : 'this card'}?
      </Typography>
      {title === modal.DELETE_PACK && (
        <Typography className={styles.title}>All cards will be deleted.</Typography>
      )}
      <div className={style.buttonContainer}>
        <MultiButton label="Cancel" onClick={onClose} color="white" />
        <MultiButton label="Delete" onClick={deleteItem} color="red" />
      </div>
    </div>
  );
};