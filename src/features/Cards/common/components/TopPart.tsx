import React from 'react';

import Typography from '@mui/material/Typography/Typography';

import styles from './TopPart.module.scss';

import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  headTitle: string;
  buttonTitle: string;
  items: boolean;
  ownPack: boolean;
  onClickButton: () => void;
  children?: Array<ReturnComponentType>;
};

export const TopPart: React.FC<PropsType> = React.memo(
  ({ headTitle, buttonTitle, items, ownPack, onClickButton, children }) => {
    return (
      <div className={!children ? styles.mainCardPacks : styles.mainPack}>
        <div className={styles.left}>
          {children && children[0]}
          <div className={styles.titleBlock}>
            <Typography className={styles.title}>{headTitle}</Typography>
            {ownPack && children && children[1]}
          </div>
        </div>
        {ownPack && items && (
          <GeneralButton label={buttonTitle} onClick={onClickButton} />
        )}
      </div>
    );
  },
);
