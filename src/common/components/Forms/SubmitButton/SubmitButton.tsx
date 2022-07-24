import React from 'react';

import Button from '@mui/material/Button/Button';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  label: string;
  disabled?: boolean;
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
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
