import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from 'enums/path';
import { Error404 } from 'features/Error404/Error404';
import { CheckEmail } from 'features/Forgot/CheckEmail/CheckEmail';
import { ForgotPassword } from 'features/Forgot/ForgotPassword/ForgotPassword';
import { NewPassword } from 'features/Forgot/NewPassword/NewPassword';
import { Login } from 'features/Login/Login';
import { Profile } from 'features/Profile/Profile';
import { Register } from 'features/Register/Register';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Pages = (): ReturnComponentType => (
  <div>
    <Routes>
      <Route path="/" element={<Navigate to={path.REGISTRATION} />} />
      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTRATION} element={<Register />} />
      <Route path={path.PROFILE} element={<Profile />} />
      <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={path.CREATE_NEW_PASSWORD} element={<NewPassword />} />
      <Route path={path.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={'/*'} element={<Error404 />} />
    </Routes>
  </div>
);
