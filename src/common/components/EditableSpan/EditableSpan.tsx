import React, { useEffect, useState } from 'react';

import { Box, IconButton, Input, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useFormik } from 'formik';

import edit from 'assets/images/edit.svg';
import s from 'common/components/EditableSpan/EditableSpan.module.css';
import { maxNameLength, minNameLength } from 'common/constants/projectConstants';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { updateUser } from 'features/Profile/profileReducer';

type PropsType = {
  name: string;
};

export const EditableSpan: React.FC<PropsType> = ({ name }): ReturnComponentType => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { name },
    validate: value => {
      const errors: { name?: string } = {};

      if (value.name.length > maxNameLength) {
        errors.name = 'The length of the name is too long.';
      }

      if (value.name.length < minNameLength) {
        errors.name = 'The length of the name is too short.';
      }

      return errors;
    },
    onSubmit: value => {
      dispatch(updateUser({ name: value.name, avatar: '' }));
      setEditMode(false);
    },
  });

  const onEditMode = (): void => {
    setEditMode(true);
    formik.values.name = name;
  };

  useEffect(() => {
    const listener = (): void => {
      setEditMode(false);
    };

    if (editMode) {
      window.addEventListener('dblclick', listener);
    }

    return () => window.removeEventListener('dblclick', listener);
  }, [editMode]);

  return (
    <Box component="div" className={s.container}>
      {!editMode ? (
        <Box component="span">
          {name}
          <IconButton onClick={onEditMode}>
            <Box component="img" src={edit} alt="edit" />
          </IconButton>
        </Box>
      ) : (
        <FormControl variant="standard" component="form" onSubmit={formik.handleSubmit}>
          {!formik.errors.name ? (
            <InputLabel>Nickname</InputLabel>
          ) : (
            <InputLabel color="error">{formik.errors.name}</InputLabel>
          )}
          <Input
            name="name"
            autoFocus
            defaultValue={name}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  type="submit"
                  variant="contained"
                  className={s.saveButton}
                  disabled={!!formik.errors.name || formik.values.name === name}
                >
                  save
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    </Box>
  );
};
