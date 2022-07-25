import React, { useEffect } from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import styles from './FormRegister.module.css';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { changeDisabledButton } from 'features/Register/registerReducer';
import { getDisabledField, getDisabledButton } from 'features/Register/registerSelectors';
import { RegisterFormType } from 'features/Register/RegisterTypes';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<RegisterFormType>;
};
export const FormRegister: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, touched } = { ...formik };
  const dispatch = useAppDispatch();
  const disabledButton = useAppSelector(getDisabledButton);
  const disabledField = useAppSelector(getDisabledField);

  useEffect(() => {
    if (isValid && touched.email)
      dispatch(changeDisabledButton({ disabledButton: false }));
    else dispatch(changeDisabledButton({ disabledButton: true }));
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
          disabled={disabledButton}
          className={styles.submitButton}
        />
      </FormGroup>
    </Form>
  );
};
