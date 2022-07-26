import * as Yup from 'yup';

import { minPasswordDigits } from 'constants/minPasswordDigits';

export const validateRegisterForm = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string()
    .min(minPasswordDigits + 1, `Password must be more than ${minPasswordDigits} digits`)
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must be the same'),
});
