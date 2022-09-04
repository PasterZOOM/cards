import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';

import styles from './ChatModal.module.scss';

import { useAppDispatch } from 'common/hooks/hooks';
import { ChatMessages } from 'features/Chat/ChatModal/ChatMessages/ChatMessages';
import { setMessage } from 'features/Chat/chatReducer';

type PropsType = {
  closeChatModal: () => void;
  clearUnreadMessages: (value: number) => void;
};

export const ChatModal: React.FC<PropsType> = ({
  closeChatModal,
  clearUnreadMessages,
}) => {
  const dispatch = useAppDispatch();
  const [messageValue, setMessageValue] = useState('');
  const [scrollDown, setScrollDown] = useState(false);

  const onChangeMessageValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setMessageValue(e.currentTarget.value);
  };

  const sendMessage = (): void => {
    if (messageValue.trim().length) {
      dispatch(setMessage(messageValue));
      setScrollDown(true);
    }
    setMessageValue('');
  };

  const onKeyUpEnter = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (e.key === 'Enter' && messageValue) sendMessage();
  };

  return (
    <Paper elevation={3} className={styles.paper}>
      <div className={styles.header}>
        <Typography className={styles.title}>Chat</Typography>
        <IconButton onClick={closeChatModal} size="small">
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>

      <ChatMessages
        clearUnreadMessages={clearUnreadMessages}
        scrollDown={scrollDown}
        setScrollDown={setScrollDown}
      />

      <InputBase
        className={styles.input}
        placeholder="Write a message..."
        value={messageValue}
        onKeyUp={onKeyUpEnter}
        onChange={onChangeMessageValue}
        endAdornment={
          <IconButton onClick={sendMessage} disabled={!messageValue}>
            <SendIcon fontSize="inherit" color={messageValue ? 'primary' : undefined} />
          </IconButton>
        }
      />
    </Paper>
  );
};
