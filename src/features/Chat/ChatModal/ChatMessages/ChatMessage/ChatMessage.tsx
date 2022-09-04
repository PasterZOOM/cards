import React from 'react';

import Avatar from '@mui/material/Avatar/Avatar';

import styles from './ChatMmessage.module.scss';

import { MessageType } from 'api/ResponseTypes';
import { useAppSelector } from 'common/hooks/hooks';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';

type PropsType = {
  message: MessageType;
};

export const ChatMessage: React.FC<PropsType> = ({ message }) => {
  const userId = useAppSelector(getUserId);
  const isMyMessage = userId === message.user._id;

  return (
    <div className={isMyMessage ? styles.myMessageBlock : styles.messageBlock}>
      {!isMyMessage && <Avatar alt="avatar" src={message.user.avatar || undefined} />}

      <div className={styles.message}>
        {!isMyMessage && <div className={styles.name}>{message.user.name}</div>}
        <div className={styles.text}>{message.message}</div>
      </div>
    </div>
  );
};
