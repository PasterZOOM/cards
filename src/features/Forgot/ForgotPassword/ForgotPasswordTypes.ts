export type ForgotPasswordFormType = {
  email: string;
};
export type RepairPasswordRequestType = {
  email: string;
  from: string;
  message: string;
};
export type NewPasswordRequestType = {
  password: string;
  resetPasswordToken: string;
};
