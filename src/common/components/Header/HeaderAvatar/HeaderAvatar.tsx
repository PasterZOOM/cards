import React from 'react';

import Avatar from '@mui/material/Avatar/Avatar';
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';

import styles from './HeaderAvatar.module.scss';

import logout from 'assets/images/logout.svg';
import profile from 'assets/images/profile.svg';
import { OptionMenu } from 'common/components/OptionMenu/OptionMenu';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { logOut } from 'features/Auth/User/Login/authReducer';
import { getAvatar, getUserName } from 'features/Auth/User/Profile/profileSelectors';

export const HeaderAvatar = (): ReturnComponentType => {
  const avatar = useAppSelector(getAvatar);
  const userName = useAppSelector(getUserName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      title: 'Profile',
      icon: profile,
      action: (): void => {
        navigate(path.PROFILE);
      },
    },
    {
      title: 'Log out',
      icon: logout,
      action: (): void => {
        dispatch(logOut());
      },
    },
  ];

  return (
    <div className={styles.main}>
      <Typography className={styles.userName}>{userName}</Typography>
      <OptionMenu menuItems={menuItems}>
        <Avatar alt="avatar" src={avatar || undefined} />
      </OptionMenu>
    </div>
  );
};
