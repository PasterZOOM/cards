import { NewUserType } from 'features/Auth/Register/RegisterTypes';
import { UserType } from 'features/Profile/ProfileTypes';

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
