import { NewUserType } from 'features/Register/RegisterTypes';

export type ChangeUserNameType = {
  name: string;
  avatar: string;
};

export type UserType = NewUserType & {
  token: string;
  tokenDeathTime: number;
  avatar: string | null;
};
