import React, { ReactElement } from 'react';

import { Box } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { UserType } from 'api/ResponseTypes';
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
      <TableCell padding="none">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.publicCardPacksCount}</TableCell>
    </TableRow>
  );
};
