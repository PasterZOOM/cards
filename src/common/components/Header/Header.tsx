import React from 'react';

import Button from '@mui/material/Button/Button';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

import logo from 'assets/images/logo.svg';
import { path } from 'enums/path';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  return (
    <div>
      <div className={styles.main}>
        <NavLink to={path.PROFILE} className={styles.helperItem}>
          <img src={logo} alt="logo" className={styles.logo} />
        </NavLink>
        <NavLink to={path.LOGIN} className={styles.helperItem}>
          <Button variant="contained" color="primary" className={styles.button}>
            Sign in
          </Button>
        </NavLink>
      </div>
      <div className={styles.helper}>
        <NavLink to={path.LOGIN} className={styles.helperItem}>
          Login
        </NavLink>
        <NavLink to={path.REGISTRATION} className={styles.helperItem}>
          Registration
        </NavLink>
        <NavLink to={path.PROFILE} className={styles.helperItem}>
          Profile
        </NavLink>
        <NavLink to="/a" className={styles.helperItem}>
          ERROR_404
        </NavLink>
      </div>
    </div>
  );
};
