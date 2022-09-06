import React, { ReactElement } from 'react';

import { Box } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';

import { UserType } from 'api/ResponseTypes';
import s from 'common/components/DataTable/DataTable.module.scss';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type UserTableBodyProps = {
  user: Omit<UserType, 'rememberMe' | '__v'>;
};

export const UserTableBody: React.FC<UserTableBodyProps> = ({
  user,
}): ReturnComponentType => {
  const showUserAvatarIfAvailable = (): ReactElement | undefined => {
    const countOfSymbols = 11;

    if (user.avatar) {
      if (user.avatar.substring(0, countOfSymbols) === 'data:image/') {
        return (
          <Box sx={{ height: '50px' }} component="img" src={user.avatar} alt="avatar" />
        );
      }
    }
  };

  return (
    <TableRow hover>
      <TableCell>{showUserAvatarIfAvailable()}</TableCell>
      <TableCell padding="none">
        <NavLink to={`${path.PACKS}?user_id=${user._id}`} className={s.nameLink}>
          {user.name}
        </NavLink>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.publicCardPacksCount}</TableCell>
    </TableRow>
  );
};
