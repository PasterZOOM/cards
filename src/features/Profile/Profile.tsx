import React from 'react';

import { Avatar, Badge, Button, Card, Grid, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EditableSpan } from './EditableSpan/EditableSpan';
import { Camera } from './Icons/Camera';
import { LogOut } from './Icons/LogOut';
import s from './Profile.module.css';

import { ReturnComponentType } from 'types/ReturnComponentType';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 150,
  },
  card: {
    width: 413,
    height: 360,
    boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 22,
    margin: 27,
  },
  avatar: {
    margin: 3,
  },
});

export const Profile = (): ReturnComponentType => {
  const styles = useStyles();

  return (
    <Grid container className={styles.container}>
      <Card className={styles.card} variant="outlined">
        <h2 className={styles.title}>Personal Information</h2>
        <Stack>
          <Badge
            className={s.icoContainer}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<Camera />}
          >
            <Avatar className={styles.avatar} sx={{ width: 96, height: 96 }} />
          </Badge>
        </Stack>

        <EditableSpan />

        <div className={s.email}>j&johnson@gmail.com</div>

        <Button className={s.button}>
          <LogOut />
          Log out
        </Button>
      </Card>
    </Grid>
  );
};
