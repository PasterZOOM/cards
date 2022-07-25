import React from 'react';

import Button from '@mui/material/Button/Button';

import styles from './SubmitButton.module.css';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  label: string;
  disabled?: boolean;
  className?: string;
};

export const SubmitButton: React.FC<PropsType> = ({
  label,
  disabled,
  className,
}): ReturnComponentType => {
  return (
    <div className={className}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={disabled}
        className={styles.button}
      >
        <span className={styles.buttonText}>{label}</span>
      </Button>
    </div>
  );
};
