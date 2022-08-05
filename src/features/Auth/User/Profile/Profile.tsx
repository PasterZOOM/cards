import React from 'react';

import { Avatar, Badge, Box, Button, Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import styles from './Profile.module.scss';

import camera from 'assets/images/camera.svg';
import logout from 'assets/images/logout.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { logOut } from 'features/Auth/User/Login/authReducer';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUser } from 'features/Auth/User/Profile/profileSelectors';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <Box component="div" className={styles.container}>
      <div className={styles.back}>
        <BackToCardPacks />
      </div>

      <Paper elevation={3} className={styles.card}>
        <Typography component="h2" className={styles.title}>
          Personal Information
        </Typography>
        <Stack>
          <Badge
            className={styles.icoContainer}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<Box component="img" src={camera} alt="camera" />}
          >
            <Avatar
              className={styles.avatar}
              sx={{ width: 96, height: 96 }}
              src={user.avatar as string}
            />
          </Badge>
        </Stack>

        <EditableSpan name={user.name} />

        <Box component="span" className={styles.email}>
          {user.email}
        </Box>

        <Button className={styles.button} onClick={() => dispatch(logOut())}>
          <Box component="img" src={logout} alt="camera" className={styles.logout} />
          Log out
        </Button>
      </Paper>
    </Box>
  );
};
