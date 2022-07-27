import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import Typography from '@mui/material/Typography/Typography';
import { Form, FormikProps } from 'formik';

import styles from './ForgotForm.module.css';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<{ email: string }>;
};
export const ForgotForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty, isSubmitting } = { ...formik };

  return (
    <Form>
      <FormGroup>
        <EmailField name="email" label="Email" disabled={isSubmitting} />
        <Typography className={styles.span}>
          Enter your email address and we will send you further instructions
        </Typography>
        <SubmitButton
          label="Send Instructions"
          disabled={!isValid || !dirty || isSubmitting}
        />
      </FormGroup>
    </Form>
  );
};
