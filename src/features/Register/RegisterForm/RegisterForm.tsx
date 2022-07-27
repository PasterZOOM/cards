import React, { useEffect } from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import { changeRegisterButtonStatus } from '../registerReducer';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { buttonStatus } from 'enums/buttonStatus';
import {
  getRegisterFieldsStatus,
  getRegisterButtonStatus,
} from 'features/Register/registerSelectors';
import { RegisterFormType } from 'features/Register/RegisterTypes';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<RegisterFormType>;
};
export const RegisterForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty } = { ...formik };
  const dispatch = useAppDispatch();
  const registerButtonStatus = useAppSelector(getRegisterButtonStatus);
  const registerFieldsStatus = useAppSelector(getRegisterFieldsStatus);

  useEffect(() => {
    if (isValid && dirty)
      dispatch(changeRegisterButtonStatus({ registerButtonStatus: buttonStatus.ACTIVE }));
    else
      dispatch(
        changeRegisterButtonStatus({ registerButtonStatus: buttonStatus.DISABLED }),
      );
  }, [isValid, dirty, dispatch]);

  return (
    <Form>
      <FormGroup>
        <EmailField name="email" label="Email" disabled={registerFieldsStatus} />
        <PasswordField name="password" label="Password" disabled={registerFieldsStatus} />
        <PasswordField
          name="confirmPassword"
          label="Confirm Password"
          disabled={registerFieldsStatus}
        />
        <SubmitButton label="Sing Up" disabled={registerButtonStatus} />
      </FormGroup>
    </Form>
  );
};
