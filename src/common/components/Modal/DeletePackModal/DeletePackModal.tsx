import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button/Button';

import { BasicModal } from '../BasicModal/BasicModal';

import style from 'common/components/Modal/DeletePackModal/DeletePackModal.module.scss';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { deletePack } from 'features/Cards/CardPacks/cardsPacksReducer';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  packId: string;
  packName: string;
};

export const DeletePackModal: React.FC<PropsType> = ({
  open,
  handleClose,
  title,
  packId,
  packName,
}): ReturnComponentType => {
  const dispatch = useAppDispatch();

  return (
    <BasicModal title={title} handleClose={handleClose} open={open}>
      <Box className={style.form}>
        <p>
          Do you really want to remove <b>{`${packName}`}</b>?
          <br /> All cards will be deleted.
        </p>
        <div className={style.buttonContainer}>
          <Button onClick={handleClose} className={style.btn} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => dispatch(deletePack(packId))}
            type="submit"
            className={style.btn}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </div>
      </Box>
    </BasicModal>
  );
};
