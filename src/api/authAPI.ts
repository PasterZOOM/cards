import axios from 'axios';

import {
  InfoResponseType,
  MeResponseType,
  RegisterResponseType,
  UpdatedUserResponseType,
} from 'api/ResponseTypes';
import {
  NewPasswordRequestType,
  RepairPasswordRequestType,
} from 'features/Auth/Forgot/ForgotPassword/ForgotPasswordTypes';
import { LoginFormType } from 'features/Auth/User/Login/loginTypes';
import { UpdateUserType } from 'features/Auth/User/Profile/ProfileTypes';
import { RegisterParamsType } from 'features/Auth/User/Register/RegisterTypes';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});
// export const instance = axios.create({
//   baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
//   withCredentials: true,
// });

export const userAPI = {
  register(data: RegisterParamsType) {
    return instance.post<RegisterResponseType>('auth/register', data);
  },
  login(data: LoginFormType) {
    return instance.post<MeResponseType>('auth/login', data);
  },
  logOut() {
    return instance.delete<InfoResponseType>('auth/me');
  },
  me() {
    return instance.post<MeResponseType>('auth/me');
  },
  changeUserName(data: UpdateUserType) {
    return instance.put<UpdatedUserResponseType>('auth/me', data);
  },
};

export const repairPasswordAPI = {
  sendEmail(data: RepairPasswordRequestType) {
    return instance.post<InfoResponseType>('/auth/forgot', data);
  },
  sendNewPassword(data: NewPasswordRequestType) {
    return instance.post<InfoResponseType>('/auth/set-new-password', data);
  },
};
