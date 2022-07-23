import React from 'react';

import { NavLink } from 'react-router-dom';

import { path } from 'enums/path';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  return (
    <div>
      <NavLink to={path.LOGIN}> Login </NavLink>
      <NavLink to={path.REGISTRATION}> Registration </NavLink>
      <NavLink to={path.PROFILE}> Profile </NavLink>
      <NavLink to="/a"> ERROR_404 </NavLink>
    </div>
  );
};
