import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';

import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';
import { InputBase } from '@mui/material';
import Avatar from '@mui/material/Avatar/Avatar';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';

import styles from './Chat.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  getAvatar,
  getUserId,
  getUserName,
} from 'features/Auth/User/Profile/profileSelectors';
import {
  createConnection,
  destroyConnection,
  setMessage,
} from 'features/Chat/chatReducer';
import { getMessages } from 'features/Chat/chatSelectors';

export type MessageType = {
  message: string;
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};

export const Chat = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getAvatar);
  const messages = useAppSelector(getMessages);
  const name = useAppSelector(getUserName);
  const userId = useAppSelector(getUserId);
  const [viewChat, setViewChat] = useState(false);
  const [value, setValue] = useState('');

  const onChangeMessage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setValue(e.currentTarget.value);
  };

  const sendMessage = useCallback((): void => {
    if (value.trim().length) {
      dispatch(setMessage(value));
    }
    setValue('');
  }, [dispatch, value]);

  const onKeyUpEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && value) sendMessage();
    },
    [sendMessage, value],
  );

  useEffect(() => {
    dispatch(createConnection({ userId, name, avatar }));

    return () => {
      dispatch(destroyConnection());
    };
  }, [dispatch, userId, name, avatar]);

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
              <div
                key={message._id}
                className={
                  userId === message.user._id
                    ? styles.myMessageBlock
                    : styles.messageBlock
                }
              >
                {userId !== message.user._id && (
                  <Avatar alt="avatar" src={message.user.avatar || undefined} />
                )}
                <div className={styles.message}>
                  {userId !== message.user._id && (
                    <div className={styles.name}>{message.user.name}</div>
                  )}
                  <div className={styles.text}>{message.message}</div>
                </div>
              </div>
            ))}
          </div>

          <InputBase
            className={styles.input}
            placeholder="Write a message..."
            value={value}
            onKeyUp={onKeyUpEnter}
            onChange={onChangeMessage}
            endAdornment={
              <IconButton onClick={sendMessage} disabled={!value}>
                <SendIcon fontSize="inherit" color={value ? 'primary' : undefined} />
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
