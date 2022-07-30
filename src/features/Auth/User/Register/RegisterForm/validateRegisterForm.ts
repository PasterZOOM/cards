import * as Yup from 'yup';

import { minPasswordLength } from 'common/constants/projectConstants';

export const validateRegisterForm = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(minPasswordLength, `Password must be more than ${minPasswordLength - 1} digits`)
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must be the same'),
});
