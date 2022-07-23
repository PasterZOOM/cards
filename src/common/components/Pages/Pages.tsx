import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from 'enums/path';
import { Error404 } from 'faetures/Error404/Error404';
import { Login } from 'faetures/Login/Login';
import { Profile } from 'faetures/Profile/Profile';
import { Registration } from 'faetures/Registration/Registration';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Pages = (): ReturnComponentType => (
  <div>
    <Routes>
      <Route path="/" element={<Navigate to={path.PROFILE} />} />
      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTRATION} element={<Registration />} />
      <Route path={path.PROFILE} element={<Profile />} />
      <Route path={'/*'} element={<Error404 />} />
    </Routes>
  </div>
);
