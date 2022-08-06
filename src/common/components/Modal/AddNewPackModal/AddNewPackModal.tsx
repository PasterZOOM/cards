import React, { ChangeEvent, useState } from 'react';

import { Checkbox, TextField } from '@mui/material';
import Button from '@mui/material/Button/Button';

import { CardPacksParamsType } from '../../../../api/cardsAPI';
import { CreatePackType } from '../../../../api/cardsRequestTypes';
import closeIcon from '../../../../assets/images/closeIcon.svg';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import { BasicModal } from '../BasicModal/BasicModal';

import style from './AddNewPackModal.module.scss';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  param: CardPacksParamsType;
  callBack: (create: CreatePackType, load: CardPacksParamsType) => void;
};

export const AddNewPackModal: React.FC<PropsType> = ({
  open,
  handleClose,
  title,
  callBack,
  param,
}): ReturnComponentType => {
  const [value, setValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const onCheckBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setChecked(e.currentTarget.checked);
  };
  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setValue(e.currentTarget.value);
  };

  const onSaveClick = (): void => {
    const create = {
      cardsPack: {
        name: value,
        deckCover: '',
        private: checked,
      },
    };

    callBack(create, param);
    handleClose();
  };

  return (
    <BasicModal handleClose={handleClose} open={open}>
      <div className={style.main}>
        <div className={style.header}>
          <h3 className={style.title}>{title}</h3>
          <img className={style.icon} src={closeIcon} alt="" />
        </div>
        <div className={style.line} />
        <TextField
          value={value}
          onChange={onInputChangeHandler}
          className={style.input}
          id="standard-basic"
          label="Standard"
          variant="standard"
        />
        <div className={style.checkBoxContainer}>
          <Checkbox
            checked={checked}
            onChange={onCheckBoxChangeHandler}
            className={style.checkBox}
            defaultChecked
          />
          <span className={style.span}>Private pack</span>
        </div>
        <div className={style.buttonContainer}>
          <Button onClick={handleClose} className={style.btn} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onSaveClick} className={style.btn} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};
