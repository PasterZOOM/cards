import { useEffect, useMemo } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate, useSearchParams } from 'react-router-dom';

import styles from './Users.module.scss';

import { DataTable } from 'common/components/DataTable/DataTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualUsersParams } from 'common/utils/getActualParams';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { PacksParams } from 'features/Cards/Packs/CardPacksParams/PacksParams';
import { setUsersParams } from 'features/Social/Users/UsersParams/usersParamsReducer';
import { getUsersParams } from 'features/Social/Users/UsersParams/usersParamsSelectors';
import { loadUsers } from 'features/Social/Users/usersReducer';
import { getUsers, getUsersTotalCount } from 'features/Social/Users/usersSelectors';

export const Users = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const users = useAppSelector(getUsers);
  const usersTotalCount = useAppSelector(getUsersTotalCount);
  const stateParams = useAppSelector(getUsersParams);

  const URLParams = useMemo(() => getActualUsersParams(searchParams), [searchParams]);

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    if (JSON.stringify(stateParams) !== JSON.stringify(URLParams))
      dispatch(setUsersParams(URLParams));
  }, [dispatch, URLParams]);

  useEffect(() => {
    if (JSON.stringify(stateParams) === JSON.stringify(URLParams))
      dispatch(loadUsers(stateParams));
  }, [dispatch, stateParams]);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Typography className={styles.title}>Users</Typography>
      </div>
      <PacksParams />
      <div className={styles.body}>
        {users.length !== 0 ? (
          <div>
            <DataTable tableType="users" />
            <Paginator totalCount={usersTotalCount} />
          </div>
        ) : (
          <Typography className={styles.title}>
            Nothing found for your request.
          </Typography>
        )}
      </div>
    </div>
  );
};
