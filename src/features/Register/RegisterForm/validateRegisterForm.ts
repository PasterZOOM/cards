import * as Yup from 'yup';

import { minPasswordDigits } from 'constants/minPasswordDigits';

export const validateRegisterForm = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(minPasswordDigits, `Password must be more than ${minPasswordDigits - 1} digits`)
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must be the same'),
});
