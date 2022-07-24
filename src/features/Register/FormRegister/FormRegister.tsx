import React, { useEffect } from 'react';

import { FormGroup } from '@mui/material';
import { Form, FormikProps } from 'formik';

import styles from './FormRegister.module.css';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { toggleSubmitButton } from 'features/Register/registerReducer';
import { getRegisterButtonActive } from 'features/Register/registerSelectors';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<{ email: string; password: string; confirmPassword: string }>;
};
export const FormRegister: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, touched } = { ...formik };
  const registerButtonActive = useAppSelector(getRegisterButtonActive);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isValid && touched.email)
      dispatch(toggleSubmitButton({ registerButtonActive: true }));
    else dispatch(toggleSubmitButton({ registerButtonActive: false }));
  }, [isValid, touched, dispatch]);

  return (
    <Form>
      <FormGroup>
        <div className={styles.field}>
          <EmailField name="email" label="Email" />
        </div>
        <div className={styles.field}>
          <PasswordField name="password" label="Password" />
        </div>
        <div className={styles.field}>
          <PasswordField name="confirmPassword" label="Confirm Password" />
        </div>
        <div className={styles.submitButton}>
          <SubmitButton label="Sing Up" disabled={!registerButtonActive} />
        </div>
      </FormGroup>
    </Form>
  );
};
