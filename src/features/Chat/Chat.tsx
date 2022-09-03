import React, { useEffect, useState } from 'react';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import IconButton from '@mui/material/IconButton/IconButton';

import styles from './Chat.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  getAvatar,
  getUserId,
  getUserName,
} from 'features/Auth/User/Profile/profileSelectors';
import { ChatModal } from 'features/Chat/ChatModal';
import { createConnection, destroyConnection } from 'features/Chat/chatReducer';

export const Chat = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const [viewChat, setViewChat] = useState(false);
  const avatar = useAppSelector(getAvatar);
  const name = useAppSelector(getUserName);
  const userId = useAppSelector(getUserId);

  const closeChatModal = (): void => {
    setViewChat(false);
  };

  const openChatModal = (): void => {
    setViewChat(true);
  };

  useEffect(() => {
    dispatch(createConnection({ userId, name, avatar }));

    return () => {
      dispatch(destroyConnection());
    };
  }, [dispatch, userId, name, avatar]);

  return (
    <div className={styles.main}>
      {viewChat ? (
        <ChatModal closeChatModal={closeChatModal} />
      ) : (
        <IconButton size="large" onClick={openChatModal}>
          <QuestionAnswerIcon fontSize="inherit" />
        </IconButton>
      )}
    </div>
  );
};
