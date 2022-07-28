import axios from 'axios';

import { LoginFormType } from 'features/Login/loginTypes';
import { ChangeUserNameType } from 'features/Profile/ProfileTypes';
import { RegisterParamsType } from 'features/Register/RegisterTypes';
import {
  LogOutResponseType,
  RegisterResponseType,
  UpdatedUserType,
  UserType,
} from 'types/ResponseType';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  register(data: RegisterParamsType) {
    return instance.post<RegisterResponseType>('auth/register', data);
  },
  login(data: LoginFormType) {
    return instance.post<UserType>('auth/login', data);
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
