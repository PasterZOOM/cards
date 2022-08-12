import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import Typography from '@mui/material/Typography/Typography';
import { Form, FormikProps } from 'formik';

import styles from './NewPasswordForm.module.scss';

import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<{ password: string }>;
};
export const NewPasswordForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty, isSubmitting } = { ...formik };

  return (
    <Form>
      <FormGroup>
        <PasswordField name="password" label="Password" disabled={isSubmitting} />
        <Typography className={styles.span}>
          Create new password and we will send you further instructions to email
        </Typography>
        <GeneralButton
          type="submit"
          label="Create new password"
          disabled={!isValid || !dirty || isSubmitting}
        />
      </FormGroup>
    </Form>
  );
};
