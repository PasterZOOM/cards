import React, { useState } from 'react';

import { IconButton, Input, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';

import { useAppDispatch } from '../../../common/hooks/hooks';
import { Pencil } from '../Icons/Pencil';
import { changeUserNameTC } from '../profileReducer';

import s from './EditableSpan.module.css';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  name: string;
};

export const EditableSpan: React.FC<PropsType> = ({ name }): ReturnComponentType => {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);
  const dispatch = useAppDispatch();

  const activateEditMode = (): void => {
    setEditMode(true);
    setNewName(name);
  };

  const saveNewName = (): void => {
    dispatch(changeUserNameTC(newName));
    setEditMode(false);
  };

  return (
    <div className={s.container}>
      {!editMode ? (
        <span>
          {name}
          <IconButton onClick={activateEditMode}>
            <Pencil />
          </IconButton>
        </span>
      ) : (
        <FormControl variant="standard">
          <InputLabel>Nickname</InputLabel>
          <Input
            defaultValue={newName}
            onChange={e => setNewName(e.currentTarget.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  className={s.saveButton}
                  onClick={saveNewName}
                >
                  save
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    </div>
  );
};
