import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useField } from 'formik';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  name: string;
  label: string;
};

export const PasswordField: React.FC<PropsType> = ({
  label,
  name,
}): ReturnComponentType => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const onClickIconButtonHandle = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="standard">
      <InputLabel>{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        margin="dense"
        {...field}
        name={name}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClickIconButtonHandle}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
