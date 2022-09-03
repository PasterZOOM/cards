import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { InputBase } from '@mui/material';
import Avatar from '@mui/material/Avatar/Avatar';
import IconButton from '@mui/material/IconButton/IconButton';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import OverlayScrollbars from 'overlayscrollbars';

import { differenceScrollPosition } from 'common/constants/projectConstants';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import styles from 'features/Chat/Chat.module.scss';
import { setMessage } from 'features/Chat/chatReducer';
import { getMessages } from 'features/Chat/chatSelectors';

type PropsType = {
  closeChatModal: () => void;
};

export const ChatModal: React.FC<PropsType> = ({ closeChatModal }) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(getMessages);
  const userId = useAppSelector(getUserId);
  const [messageValue, setMessageValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const chatMessages = useRef(null);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    let instance: OverlayScrollbars;

    if (chatMessages.current) {
      instance = OverlayScrollbars(chatMessages.current, {
        scrollbars: {
          clickScrolling: true,
          autoHide: 'leave',
          autoHideDelay: 0,
        },
      });
      if (instance.scroll().max.y - differenceScrollPosition < scrollPosition || first) {
        instance.scroll({ y: '100%' });
      } else instance.scroll({ y: scrollPosition });
      setFirst(false);

      return () => {
        instance.destroy();
      };
    }
  }, [chatMessages, first, messages, scrollPosition]);

  useEffect(() => {
    let instance: OverlayScrollbars;

    if (chatMessages.current) {
      instance = OverlayScrollbars(chatMessages.current, {});
      setScrollPosition(instance.scroll().position.y);
    }
  });

  const onChangeMessageValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setMessageValue(e.currentTarget.value);
  };

  const sendMessage = useCallback((): void => {
    if (messageValue.trim().length) {
      dispatch(setMessage(messageValue));
    }
    setMessageValue('');
  }, [dispatch, messageValue]);

  const onKeyUpEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      if (e.key === 'Enter' && messageValue) sendMessage();
    },
    [sendMessage, messageValue],
  );

  return (
    <Paper elevation={3} className={styles.paper}>
      <div className={styles.header}>
        <Typography className={styles.title}>Chat</Typography>
        <IconButton onClick={closeChatModal} size="small">
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div ref={chatMessages} className={styles.messages}>
        {messages.map(message => (
          <div
            key={message._id}
            className={
              userId === message.user._id ? styles.myMessageBlock : styles.messageBlock
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
