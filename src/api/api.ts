import axios from 'axios';

import { ChangeUserNameType } from '../features/Profile/ProfileTypes';

import { RegisterParamsType } from 'features/Register/RegisterTypes';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  register(data: RegisterParamsType) {
    return instance.post('auth/register', data);
  },
  me() {
    return instance.post('auth/me', {});
  },
  changeUserName(data: ChangeUserNameType) {
    return instance.put('auth/me', data);
  },
  logOut() {
    return instance.delete('auth/me', {});
  },
};
