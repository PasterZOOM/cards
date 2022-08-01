import React from 'react';

import AppBar from '@mui/material/AppBar/AppBar';
import Button from '@mui/material/Button/Button';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { NavLink } from 'react-router-dom';

import logo from 'assets/images/logo.svg';
import styles from 'common/components/Header/Header.module.scss';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  return (
    <AppBar position="static" className={styles.main}>
      <Toolbar className={styles.toolbar}>
        <NavLink to={path.CARD_PACKS}>
          <img src={logo} alt="logo" className={styles.logo} />
        </NavLink>
        <NavLink to={path.LOGIN} className={styles.link}>
          <Button variant="contained" color="primary" className={styles.button}>
            Sign In
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
