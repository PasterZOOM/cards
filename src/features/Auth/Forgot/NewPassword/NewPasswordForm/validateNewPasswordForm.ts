import * as Yup from 'yup';

import { minPasswordLength } from 'common/constants/projectConstants';

export const validateNewPasswordForm = Yup.object().shape({
  password: Yup.string()
    .min(minPasswordLength, `Password must be more than ${minPasswordLength - 1} digits`)
    .required('Required'),
});
