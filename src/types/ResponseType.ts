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
