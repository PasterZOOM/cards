import React, { useEffect, useState } from 'react';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Badge from '@mui/material/Badge/Badge';
import IconButton from '@mui/material/IconButton/IconButton';

import styles from './Chat.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  getAvatar,
  getUserId,
  getUserName,
} from 'features/Auth/User/Profile/profileSelectors';
import { ChatModal } from 'features/Chat/ChatModal/ChatModal';
import { createConnection, destroyConnection } from 'features/Chat/chatReducer';
import { getMessages } from 'features/Chat/chatSelectors';

export const Chat = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const [viewChat, setViewChat] = useState(false);
  const [first, setFirst] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const avatar = useAppSelector(getAvatar);
  const messages = useAppSelector(getMessages);
  const name = useAppSelector(getUserName);
  const userId = useAppSelector(getUserId);

  const closeChatModal = (): void => {
    setViewChat(false);
  };

  const openChatModal = (): void => {
    setViewChat(true);
    setUnreadMessages(0);
  };

  useEffect(() => {
    dispatch(createConnection({ userId, name, avatar }));

    return () => {
      dispatch(destroyConnection());
    };
  }, [dispatch, userId, name, avatar]);

  useEffect(() => {
    if (first) {
      setUnreadMessages(unreadMessages - 1);
      setFirst(false);
    } else if (messages.length !== 0) {
      setUnreadMessages(unreadMessages + 1);
    }
  }, [messages]);

  return (
    <div className={styles.main}>
      {viewChat ? (
        <ChatModal
          closeChatModal={closeChatModal}
          clearUnreadMessages={setUnreadMessages}
        />
      ) : (
        <IconButton size="large" onClick={openChatModal}>
          <Badge badgeContent={unreadMessages} color="primary">
            <QuestionAnswerIcon fontSize="inherit" />
          </Badge>
        </IconButton>
      )}
    </div>
  );
};
