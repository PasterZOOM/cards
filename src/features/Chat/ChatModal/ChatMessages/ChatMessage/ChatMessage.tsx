import React from 'react';

import Avatar from '@mui/material/Avatar/Avatar';
import { NavLink } from 'react-router-dom';

import styles from './ChatMmessage.module.scss';

import { MessageType } from 'api/ResponseTypes';
import s from 'common/components/DataTable/DataTable.module.scss';
import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';

type PropsType = {
  message: MessageType;
};

export const ChatMessage: React.FC<PropsType> = ({ message }) => {
  const myId = useAppSelector(getUserId);
  const userId = message.user._id;
  const { name } = message.user;
  const isMyMessage = myId === userId;

  return (
    <div className={isMyMessage ? styles.myMessageBlock : styles.messageBlock}>
      {!isMyMessage &&
        (name === 'anonymous' || name === 'neko-admin' ? (
          <Avatar alt="avatar" />
        ) : (
          <NavLink to={`${path.PACKS}?user_id=${userId}`} className={s.nameLink}>
            <Avatar alt="avatar" src={message.user.avatar || undefined} />
          </NavLink>
        ))}

      <div className={styles.message}>
        {!isMyMessage && <div className={styles.name}>{name}</div>}
        <div className={styles.text}>{message.message}</div>
      </div>
    </div>
  );
};
