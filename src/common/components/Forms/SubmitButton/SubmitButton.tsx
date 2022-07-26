import React from 'react';

import Button from '@mui/material/Button/Button';

import styles from './SubmitButton.module.css';

import { buttonStatus } from 'enums/buttonStatus';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  label: string;
  disabled?: buttonStatus;
};

export const SubmitButton: React.FC<PropsType> = ({
  label,
  disabled,
}): ReturnComponentType => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={disabled === buttonStatus.DISABLED}
      className={styles.button}
    >
      {label}
    </Button>
  );
};
