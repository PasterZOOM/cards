import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';

import styles from './Chat.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Chat = (): ReturnComponentType => {
  const [viewChat, setViewChat] = useState(false);

  return (
    <div className={styles.main}>
      {viewChat ? (
        <Paper elevation={3} className={styles.paper}>
          <IconButton
            onClick={() => setViewChat(false)}
            size="small"
            className={styles.close}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Paper>
      ) : (
        <IconButton size="large" onClick={() => setViewChat(true)}>
          <QuestionAnswerIcon fontSize="inherit" />
        </IconButton>
      )}
    </div>
  );
};
