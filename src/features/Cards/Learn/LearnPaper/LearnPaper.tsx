import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';

import styles from './LearnPaper.module.scss';

import { CardType } from 'api/ResponseTypes';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  buttonLabel: string;
  card: CardType;
  onClick: () => void;
  children?: ReturnComponentType;
};
export const LearnPaper: React.FC<PropsType> = ({
  card,
  onClick,
  buttonLabel,
  children,
}) => {
  return (
    <Paper elevation={3} className={styles.paper}>
      <Typography className={styles.question}>
        <b>Question:</b> {card.question}
      </Typography>
      <Typography className={styles.attempts}>
        Number of attempts to answer the question: <b>{card.shots}</b>
      </Typography>
      {children}
      <GeneralButton onClick={onClick} label={buttonLabel} />
    </Paper>
  );
};
