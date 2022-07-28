import { UserType } from 'features/Profile/ProfileTypes';
import { NewUserType } from 'features/Register/RegisterTypes';

export type MeResponseType = UserType & {
  error?: string;
};
export type RegisterResponseType = {
  addedUser: NewUserType;
  error?: string;
};
export type UpdatedUserResponseType = {
  updatedUser: UserType;
  token: string;
  tokenDeathTime: number;
  error?: string;
};
export type InfoResponseType = {
  info: string;
  error: string;
};
