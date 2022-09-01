import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';
import { InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';

import styles from './Chat.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getUserId, getUserName } from 'features/Auth/User/Profile/profileSelectors';
import {
  createConnection,
  destroyConnection,
  setClient,
  setMessage,
} from 'features/Chat/chatReducer';
import { getMessages } from 'features/Chat/chatSelectors';

export type MessageType = {
  message: string;
  _id: string;
  user: {
    _id: string;
    name: string;
  };
};

export const Chat = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(getMessages);
  const name = useAppSelector(getUserName);
  const chatUserId = useAppSelector(getUserId);
  const [viewChat, setViewChat] = useState(false);
  const [value, setValue] = useState('');

  const onChangeMessage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setValue(e.currentTarget.value);
  };

  const sendMessage = useCallback((): void => {
    dispatch(setMessage(value));
    setValue('');
  }, [dispatch, value]);

  useEffect(() => {
    dispatch(createConnection());
    dispatch(setClient({ chatUserId, name }));

    return () => {
      dispatch(destroyConnection());
    };
  }, [dispatch, chatUserId, name]);

  return (
    <div className={styles.main}>
      {viewChat ? (
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.header}>
            <Typography className={styles.title}>Chat</Typography>
            <IconButton onClick={() => setViewChat(false)} size="small">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>

          <div className={styles.messages}>
            {messages.map(message => (
              <div key={message._id} className={styles.message}>
                <div>
                  <b>{message.user.name}</b>
                </div>
                <div>{message.message}</div>
              </div>
            ))}
          </div>

          <InputBase
            className={styles.input}
            placeholder="Write a message..."
            value={value}
            onChange={onChangeMessage}
            endAdornment={
              <IconButton onClick={sendMessage}>
                <SendIcon fontSize="inherit" />
              </IconButton>
            }
          />
        </Paper>
      ) : (
        <IconButton size="large" onClick={() => setViewChat(true)}>
          <QuestionAnswerIcon fontSize="inherit" />
        </IconButton>
      )}
    </div>
  );
};
