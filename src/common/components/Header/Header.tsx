import React from 'react';

import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { NavLink, useNavigate } from 'react-router-dom';

import { HeaderAvatar } from './HeaderAvatar/HeaderAvatar';

import logo from 'assets/images/logo.svg';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import styles from 'common/components/Header/Header.module.scss';
import { path } from 'common/enums/path';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';

export const Header = (): ReturnComponentType => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  const onClickButtonHandle = (): void => {
    navigate(path.LOGIN);
  };

  return (
    <AppBar position="static" className={styles.main}>
      <Toolbar className={styles.toolbar}>
        <NavLink to={path.PACKS}>
          <img src={logo} alt="logo" className={styles.logo} />
        </NavLink>
        {!isLoggedIn ? (
          <GeneralButton label="Sign In" onClick={onClickButtonHandle} />
        ) : (
          <HeaderAvatar />
        )}
      </Toolbar>
    </AppBar>
  );
};
