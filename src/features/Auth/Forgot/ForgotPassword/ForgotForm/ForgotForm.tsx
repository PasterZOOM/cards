import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import Typography from '@mui/material/Typography/Typography';
import { Form, FormikProps } from 'formik';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import styles from 'features/Auth/Forgot/ForgotPassword/ForgotForm/ForgotForm.module.scss';

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
        <GeneralButton
          type="submit"
          label="Send Instructions"
          disabled={!isValid || !dirty || isSubmitting}
        />
      </FormGroup>
    </Form>
  );
};
