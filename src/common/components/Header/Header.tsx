import React from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from 'enums';

export const Header: React.FC = () => {
  return (
    <div>
      <NavLink to={PATH.LOGIN}> Login </NavLink>
      <NavLink to={PATH.REGISTRATION}> Registration </NavLink>
      <NavLink to={PATH.PROFILE}> Profile </NavLink>
      <NavLink to="/a"> ERROR_404 </NavLink>
    </div>
  );
};
