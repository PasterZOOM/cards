import React, { useState } from 'react';

import { IconButton, Input, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';

import { Pencil } from '../Icons/Pencil';

import s from './EditableSpan.module.css';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const EditableSpan = (): ReturnComponentType => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className={s.container}>
      {!editMode ? (
        <span>
          Ivan
          <IconButton onClick={() => setEditMode(true)}>
            <Pencil />
          </IconButton>
        </span>
      ) : (
        <FormControl variant="standard">
          <InputLabel>Nickname</InputLabel>
          <Input
            defaultValue="Ivan"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  className={s.saveButton}
                  onClick={() => setEditMode(false)}
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
