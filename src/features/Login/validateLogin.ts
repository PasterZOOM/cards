import * as Yup from 'yup';

import { minPasswordLength } from 'constants/projectConstants';

export const validateLogin = Yup.object().shape({
  email: Yup.string().required('Please enter email').email('Invalid email'),
  password: Yup.string()
    .required('Please enter password')
    .min(minPasswordLength, 'Minimum 8 characters long'),
});
