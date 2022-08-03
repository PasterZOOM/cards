import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import styles from './RegisterForm.module.scss';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { RegisterFormType } from 'features/Auth/User/Register/RegisterTypes';

type PropsType = {
  formik: FormikProps<RegisterFormType>;
};
export const RegisterForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty, isSubmitting } = { ...formik };

  return (
    <Form className={styles.main}>
      <FormGroup>
        <EmailField name="email" label="Email" disabled={isSubmitting} />
        <PasswordField name="password" label="Password" disabled={isSubmitting} />
        <PasswordField
          name="confirmPassword"
          label="Confirm Password"
          disabled={isSubmitting}
        />
        <div className={styles.button}>
          <GeneralButton
            type="submit"
            label="Sing Up"
            disabled={!isValid || !dirty || isSubmitting}
            fullWidth
          />
        </div>
      </FormGroup>
    </Form>
  );
};
