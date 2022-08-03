import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from 'common/components/Helper/Helper.module.css';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Helper = (): ReturnComponentType => {
  const helperItems = [
    { path: path.LOGIN, title: 'Login' },
    { path: path.REGISTRATION, title: 'Register' },
    { path: path.PROFILE, title: 'Profile' },
    { path: path.FORGOT_PASSWORD, title: 'ForgotPassword' },
    { path: `${path.CREATE_NEW_PASSWORD}/:token`, title: 'NewPassword' },
    { path: path.CHECK_EMAIL, title: 'CheckEmail' },
    { path: path.CARD_PACKS, title: 'Packs' },
    { path: path.CARD_PACK, title: 'Pack' },
  ];

  return (
    <div className={styles.helper}>
      {helperItems.map(item => (
        <NavLink to={item.path} className={styles.helperItem} key={item.path}>
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};
