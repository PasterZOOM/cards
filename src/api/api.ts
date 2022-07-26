import axios, { AxiosResponse } from 'axios';

import { LoginFormType } from 'features/Login/loginTypes';
import { ChangeUserNameType, UserType } from 'features/Profile/ProfileTypes';
import { RegisterParamsType } from 'features/Register/RegisterTypes';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  register(data: RegisterParamsType) {
    return instance.post('auth/register', data);
  },
  login(data: LoginFormType) {
    return instance.post<{ data: LoginFormType }, AxiosResponse<UserType>>(
      'auth/login',
      data,
    );
  },
  logOut() {
    return instance.delete('auth/me', {});
  },
  me() {
    return instance.post('auth/me', {});
  },
  changeUserName(data: ChangeUserNameType) {
    return instance.put('auth/me', data);
  },
};
