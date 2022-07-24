import React from 'react';

import Button from '@mui/material/Button/Button';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  label: string;
};

export const SubmitButton: React.FC<PropsType> = ({ label }): ReturnComponentType => {
  return (
    <Button type="submit" variant="contained" color="primary">
      {label}
    </Button>
  );
};
