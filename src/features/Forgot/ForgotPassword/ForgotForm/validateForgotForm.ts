import * as Yup from 'yup';

export const validateForgotForm = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});
