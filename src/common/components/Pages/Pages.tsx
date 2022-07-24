import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from 'enums/path';
import { Error404 } from 'features/Error404/Error404';
import { Login } from 'features/Login/Login';
import { Profile } from 'features/Profile/Profile';
import { Register } from 'features/Register/Register';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Pages = (): ReturnComponentType => (
  <div>
    <Routes>
      <Route path="/" element={<Navigate to={path.PROFILE} />} />
      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTRATION} element={<Register />} />
      <Route path={path.PROFILE} element={<Profile />} />
      <Route path={'/*'} element={<Error404 />} />
    </Routes>
  </div>
);
