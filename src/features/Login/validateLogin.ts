import * as Yup from 'yup';

import { minPassword } from 'features/Login/Login';

export const validateLogin = Yup.object().shape({
  email: Yup.string().required('Please enter email').email('Invalid email'),
  password: Yup.string()
    .required('Please enter password')
    .min(minPassword, 'Minimum 7 characters long'),
});
