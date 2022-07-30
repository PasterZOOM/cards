import React from 'react';

import { Avatar, Badge, Box, Button, Card, Stack } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import camera from 'assets/images/camera.svg';
import logout from 'assets/images/logout.svg';
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { logOut } from 'features/Auth/User/Login/authReducer';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import s from 'features/Auth/User/Profile/Profile.module.css';
import { getUser } from 'features/Auth/User/Profile/profileSelectors';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <Box component="div" className={s.container}>
      <Card className={s.card} variant="outlined">
        <Typography component="h2" className={s.title}>
          Personal Information
        </Typography>
        <Stack>
          <Badge
            className={s.icoContainer}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<Box component="img" src={camera} alt="camera" />}
          >
            <Avatar className={s.avatar} sx={{ width: 96, height: 96 }} />
          </Badge>
        </Stack>

        <EditableSpan name={user.name} />

        <Box component="span" className={s.email}>
          {user.email}
        </Box>

        <Button className={s.button} onClick={() => dispatch(logOut())}>
          <Box component="img" src={logout} alt="camera" className={s.logout} />
          Log out
        </Button>
      </Card>
    </Box>
  );
};
