import { UsersParamsType } from 'api/DataTypes';
import { instance } from 'api/instance';
import { GetUserResponseType, GetUsersResponseType } from 'api/ResponseTypes';

export const usersAPI = {
  getUsers(params: UsersParamsType) {
    return instance.get<GetUsersResponseType>('social/users', { params });
  },
  getUser(id: string) {
    return instance.get<GetUserResponseType>(`social/user?id=${id}`);
  },
};
