import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';

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
  const messages = useAppSelector(state => state.chat.messages);
  const userName = useAppSelector(getUserName);
  const userId = useAppSelector(getUserId);
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
    dispatch(setClient({ chatUserId: userId, name: userName }));

    return () => {
      dispatch(destroyConnection());
    };
  }, [dispatch, userId, userName]);

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
          {messages.map(message => (
            <div key={message._id}>
              <div>
                <b>{message.user.name}</b>
              </div>
              <div>{message.message}</div>
            </div>
          ))}
          <Input
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
