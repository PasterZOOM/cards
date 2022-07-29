import React from 'react';

import AppBar from '@mui/material/AppBar/AppBar';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Grid/Grid';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import logo from 'assets/images/logo.svg';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  return (
    <AppBar position="static" className={styles.main}>
      <Toolbar className={styles.toolbar}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <NavLink to={path.LOGIN}>
              <img src={logo} alt="logo" className={styles.logo} />
            </NavLink>
          </Grid>

          <Grid item>
            <NavLink to={path.LOGIN} className={styles.link}>
              <Button variant="contained" color="primary" className={styles.button}>
                Sign In
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
