import axios, { AxiosResponse } from 'axios';

import { LoginFormType } from 'features/Login/loginTypes';
import { ChangeUserNameType } from 'features/Profile/ProfileTypes';
import { RegisterParamsType } from 'features/Register/RegisterTypes';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  register(data: RegisterParamsType) {
    return instance.post<RegisterResponseType>('auth/register', data);
  },
  login(data: LoginFormType) {
    return instance.post<{ data: LoginFormType }, AxiosResponse<UserType>>(
      'auth/login',
      data,
    );
  },
  logOut() {
    return instance.delete<LogOutResponseType>('auth/me', {});
  },
  me() {
    return instance.post<UserType>('auth/me', {});
  },
  changeUserName(data: ChangeUserNameType) {
    return instance.put<UpdatedUserType>('auth/me', data);
  },
};
export type NewUserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
};
export type UserType = NewUserType & {
  token: string;
  tokenDeathTime: number;
  avatar: string | null;
};

export type RegisterResponseType = {
  addedUser: NewUserType;
};
export type UpdatedUserType = {
  updatedUser: UserType;
  token: string;
  tokenDeathTime: number;
};
export type LogOutResponseType = {
  info: string;
};
