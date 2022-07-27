import * as Yup from 'yup';

import { minPasswordDigits } from 'constants/minPasswordDigits';

export const validateNewPasswordForm = Yup.object().shape({
  password: Yup.string()
    .min(minPasswordDigits, `Password must be more than ${minPasswordDigits - 1} digits`)
    .required('Required'),
});
