import React from 'react';

import Button from '@mui/material/Button/Button';

import { packsOwn } from 'common/enums/packsOwn';
import { getLocalStorage } from 'common/utils/localStorageUtil';

type PropsType = {
  title: packsOwn;
  onClickButton: (buttonName: packsOwn) => void;
};

export const FilterButton: React.FC<PropsType> = ({ title, onClickButton }) => {
  const onClickButtonHandle = (): void => onClickButton(title);
  const variant = getLocalStorage('PacksOwn') === title ? 'contained' : 'outlined';

  return (
    <Button variant={variant} onClick={onClickButtonHandle}>
      {title}
    </Button>
  );
};
