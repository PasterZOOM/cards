import React from 'react';

import Button from '@mui/material/Button/Button';

import styles from './GeneralButton.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export const GeneralButton: React.FC<PropsType> = React.memo(
  ({ label, disabled, onClick, type, color, fullWidth }): ReturnComponentType => {
    return (
      <Button
        fullWidth={fullWidth}
        className={styles.button}
        variant="contained"
        type={type || undefined}
        color={color || 'primary'}
        disabled={disabled}
        onClick={onClick || undefined}
      >
        {label}
      </Button>
    );
  },
);
