import { minPasswordDigits } from 'constants/minPasswordDigits';
import { RegisterFormErrorType } from 'features/Register/RegisterTypes';

export const validateRegisterForm = (
  values: RegisterFormErrorType,
): RegisterFormErrorType => {
  const errors: RegisterFormErrorType = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < minPasswordDigits)
    errors.password = `Password must be more than ${minPasswordDigits} digits`;
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password)
    errors.confirmPassword = 'Passwords must be the same';

  return errors;
};
