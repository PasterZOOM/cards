import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from 'enums';
import { Error404, Login, Profile, Registration } from 'faetures';

export const Pages: React.FC = () => (
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
