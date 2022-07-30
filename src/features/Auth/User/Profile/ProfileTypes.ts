import { NewUserType } from 'features/Auth/User/Register/RegisterTypes';

export type UpdateUserType = {
  name: string;
  avatar: string;
};

export type UserType = NewUserType & {
  token: string;
  tokenDeathTime: number;
  avatar: string | null;
};
