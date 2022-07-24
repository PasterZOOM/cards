import React from 'react';

import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useField } from 'formik';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  name: string;
  label: string;
};

export const EmailField: React.FC<PropsType> = ({ label, name }): ReturnComponentType => {
  const [field, meta] = useField(name);

  return (
    <FormControl variant="standard">
      <InputLabel>{label}</InputLabel>
      <Input margin="dense" {...field} name={name} />
      {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
