import React from 'react';

import Button from '@mui/material/Button/Button';

import styles from './MultiButton.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  color: 'white' | 'red';
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
};

export const MultiButton: React.FC<PropsType> = React.memo(
  ({ label, disabled, onClick, type, fullWidth, color }): ReturnComponentType => {
    return (
      <Button
        fullWidth={fullWidth}
        className={`${styles.button} ${color === 'white' ? styles.white : styles.red}`}
        type={type || undefined}
        disabled={disabled}
        onClick={onClick || undefined}
      >
        {label}
      </Button>
    );
  },
);
