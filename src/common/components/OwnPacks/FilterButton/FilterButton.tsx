import React from 'react';

import Button from '@mui/material/Button/Button';

import styles from './FilterButton.module.scss';

import { packsOwn } from 'common/enums/packsOwn';

type PropsType = {
  packsOwnLS: packsOwn | null;
  title: packsOwn;
  onClickButton: (buttonName: packsOwn) => void;
};

export const FilterButton: React.FC<PropsType> = ({
  title,
  onClickButton,
  packsOwnLS,
}) => {
  const onClickButtonHandle = (): void => onClickButton(title);
  const variant = packsOwnLS === title ? 'contained' : 'outlined';

  return (
    <Button variant={variant} onClick={onClickButtonHandle} className={styles.button}>
      {title}
    </Button>
  );
};
