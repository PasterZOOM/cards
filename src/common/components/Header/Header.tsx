import React from 'react';

import { NavLink } from 'react-router-dom';

import { path } from 'enums';

export const Header: React.FC = () => {
  return (
    <div>
      <NavLink to={path.LOGIN}> Login </NavLink>
      <NavLink to={path.REGISTRATION}> Registration </NavLink>
      <NavLink to={path.PROFILE}> Profile </NavLink>
      <NavLink to="/a"> ERROR_404 </NavLink>
    </div>
  );
};
