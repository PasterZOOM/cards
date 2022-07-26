import React from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useField } from 'formik';

import styles from 'assets/styles/FieldStyles.module.css';
import { fieldStatus } from 'enums/fieldStatus';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  name: string;
  label: string;
  disabled?: fieldStatus;
};

export const EmailField: React.FC<PropsType> = ({
  label,
  name,
  disabled,
}): ReturnComponentType => {
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth variant="standard" className={styles.field}>
      <InputLabel>{label}</InputLabel>
      <Input
        margin="dense"
        {...field}
        name={name}
        disabled={disabled === fieldStatus.DISABLED}
      />
      {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
