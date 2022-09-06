import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import styles from './RoutesPage.module.scss';

import { Error404 } from 'common/components/Error404/Error404';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { CheckEmail } from 'features/Auth/Forgot/CheckEmail/CheckEmail';
import { ForgotPassword } from 'features/Auth/Forgot/ForgotPassword/ForgotPassword';
import { NewPassword } from 'features/Auth/Forgot/NewPassword/NewPassword';
import { Login } from 'features/Auth/User/Login/Login';
import { Profile } from 'features/Auth/User/Profile/Profile';
import { Register } from 'features/Auth/User/Register/Register';
import { Cards } from 'features/Cards/Cards/Cards';
import { Learn } from 'features/Cards/Learn/Learn';
import { Packs } from 'features/Cards/Packs/Packs';
import { Users } from 'features/Social/Users/Users';

export const RoutesPage = (): ReturnComponentType => {
  const routes = [
    { path: path.LOGIN, component: <Login /> },
    { path: path.REGISTRATION, component: <Register /> },
    { path: path.PROFILE, component: <Profile /> },
    { path: path.FORGOT_PASSWORD, component: <ForgotPassword /> },
    { path: `${path.CREATE_NEW_PASSWORD}/:token`, component: <NewPassword /> },
    { path: path.CHECK_EMAIL, component: <CheckEmail /> },
    { path: path.PACKS, component: <Packs /> },
    { path: path.CARDS, component: <Cards /> },
    { path: path.LEARN, component: <Learn /> },
    { path: path.USERS, component: <Users /> },
    { path: '*', component: <Error404 /> },
  ];

  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/" element={<Navigate to={path.LOGIN} />} />
        {routes.map(route => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Routes>
    </div>
  );
};
