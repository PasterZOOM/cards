import React, { useEffect } from 'react';

import { FormGroup } from '@mui/material';
import { Form, FormikProps } from 'formik';

import styles from './FormRegister.module.css';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { toggleSubmitButton } from 'features/Register/registerReducer';
import {
  getDisabledField,
  getRegisterButtonActive,
} from 'features/Register/registerSelectors';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<{ email: string; password: string; confirmPassword: string }>;
};
export const FormRegister: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, touched } = { ...formik };
  const dispatch = useAppDispatch();
  const registerButtonActive = useAppSelector(getRegisterButtonActive);
  const disabledField = useAppSelector(getDisabledField);

  useEffect(() => {
    if (isValid && touched.email)
      dispatch(toggleSubmitButton({ registerButtonActive: true }));
    else dispatch(toggleSubmitButton({ registerButtonActive: false }));
  }, [isValid, touched, dispatch]);

  return (
    <Form>
      <FormGroup>
        <EmailField
          name="email"
          label="Email"
          className={styles.field}
          disabled={disabledField}
        />
        <PasswordField
          name="password"
          label="Password"
          className={styles.field}
          disabled={disabledField}
        />
        <PasswordField
          name="confirmPassword"
          label="Confirm Password"
          className={styles.field}
          disabled={disabledField}
        />
        <SubmitButton
          label="Sing Up"
          disabled={!registerButtonActive}
          className={styles.submitButton}
        />
      </FormGroup>
    </Form>
  );
};
