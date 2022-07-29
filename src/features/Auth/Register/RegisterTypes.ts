export type RegisterFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type RegisterParamsType = {
  email: string;
  password: string;
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
