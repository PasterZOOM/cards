import React from 'react';

import { Navigate } from 'react-router-dom';

import { Header, Pages, useAppSelector } from 'common';
import { path } from 'enums';

export const App: React.FC = () => {
  const isRegistered = useAppSelector(state => state.registration.isRegistered);

  if (isRegistered) return <Navigate to={path.PROFILE} />;

  return (
    <div>
      <Header />
      <Pages />
    </div>
  );
};
