import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import Typography from '@mui/material/Typography/Typography';
import { Form, FormikProps } from 'formik';

import styles from './ForgotForm.module.scss';

import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { ProjectTextField } from 'common/components/Forms/ProjectTextField/ProjectTextField';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<{ email: string }>;
};
export const ForgotForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty, isSubmitting } = { ...formik };

  return (
    <Form>
      <FormGroup>
        <ProjectTextField name="email" label="Email" disabled={isSubmitting} />
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
