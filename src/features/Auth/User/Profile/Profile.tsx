import React, { ChangeEvent } from 'react';

import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import styles from './Profile.module.scss';

import { setAppSnackbarValue } from 'app/appReducer';
import camera from 'assets/images/camera.svg';
import logout from 'assets/images/logout.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import { path } from 'common/enums/path';
import { snackbarType } from 'common/enums/snackbarType';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { convertFileToBase64 } from 'common/utils/convertFileToBase64';
import { logOut } from 'features/Auth/User/Login/authReducer';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { updateUser } from 'features/Auth/User/Profile/profileReducer';
import { getUser } from 'features/Auth/User/Profile/profileSelectors';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const minFileSize = 40000;

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < minFileSize) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateUser({ avatar: file64 }));
        });
      } else {
        dispatch(
          setAppSnackbarValue({
            type: snackbarType.ERROR,
            message: 'Incorrect file size or type',
          }),
        );
      }
    }
  };

  const errorHandler = (): void => {
    dispatch(updateUser({ avatar: ' ' }));
    dispatch(
      setAppSnackbarValue({
        type: snackbarType.ERROR,
        message: 'Broken image',
      }),
    );
  };

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
            badgeContent={
              <label htmlFor="icon-button-photo">
                <input
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={uploadHandler}
                  id="icon-button-photo"
                />
                <Tooltip title="Update photo" placement="right-start">
                  <IconButton component="span">
                    <Box
                      className={styles.cameraIco}
                      component="img"
                      src={camera}
                      alt="camera"
                    />
                  </IconButton>
                </Tooltip>
              </label>
            }
          >
            <Avatar
              onError={errorHandler}
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
