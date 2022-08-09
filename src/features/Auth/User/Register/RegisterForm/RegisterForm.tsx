import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import styles from './RegisterForm.module.scss';

import { RegisterDataType } from 'api/DataTypes';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<RegisterDataType & { confirmPassword: string }>;
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
