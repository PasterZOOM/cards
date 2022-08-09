import { LoginDataType, RegisterDataType, UpdateUserDataType } from 'api/DataTypes';
import { instance } from 'api/instance';
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

export const userAPI = {
  register(data: RegisterDataType) {
    return instance.post<RegisterResponseType>('auth/register', data);
  },
  login(data: LoginDataType) {
    return instance.post<MeResponseType>('auth/login', data);
  },
  logOut() {
    return instance.delete<InfoResponseType>('auth/me');
  },
  me() {
    return instance.post<MeResponseType>('auth/me');
  },
  changeUserName(data: UpdateUserDataType) {
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
