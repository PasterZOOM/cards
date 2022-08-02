import React from 'react';

import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';

import styles from 'common/components/EmptyTable/EmptyTable.module.scss';

type SubTablePropsType = {
  buttonTitle: string;
  text: string;
  callBack: () => void;
};
export const EmptyTable: React.FC<SubTablePropsType> = ({
  buttonTitle,
  text,
  callBack,
}) => {
  return (
    <div className={styles.main}>
      <Typography className={styles.title}>{text}</Typography>
      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        size="large"
        onClick={callBack}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};
