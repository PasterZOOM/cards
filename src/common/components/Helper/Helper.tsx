import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from 'common/components/Helper/Helper.module.css';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Helper = (): ReturnComponentType => {
  return (
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
      <NavLink to={path.FORGOT_PASSWORD} className={styles.helperItem}>
        ForgotPassword
      </NavLink>
      <NavLink to={path.CHECK_EMAIL} className={styles.helperItem}>
        CheckEmail
      </NavLink>
      <NavLink to={`${path.CREATE_NEW_PASSWORD}/a`} className={styles.helperItem}>
        CreateNewPassword
      </NavLink>
      <NavLink to="/a" className={styles.helperItem}>
        ERROR_404
      </NavLink>
    </div>
  );
};
