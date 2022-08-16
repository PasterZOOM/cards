import { UsersParamsType } from 'api/DataTypes';
import { instance } from 'api/instance';
import { GetUsersResponseType } from 'api/ResponseTypes';

export const usersAPI = {
  getUsers(params: UsersParamsType) {
    return instance.get<GetUsersResponseType>('social/users', { params });
  },
};
