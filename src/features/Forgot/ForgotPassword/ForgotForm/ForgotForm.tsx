import React, { useEffect } from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import Typography from '@mui/material/Typography/Typography';
import { Form, FormikProps } from 'formik';

import { changeForgotButtonStatus } from '../forgotReducer';

import styles from './ForgotForm.module.css';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { SubmitButton } from 'common/components/Forms/SubmitButton/SubmitButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { buttonStatus } from 'enums/buttonStatus';
import {
  getForgotButtonStatus,
  getForgotFieldsStatus,
} from 'features/Forgot/ForgotPassword/forgotSelectors';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<{ email: string }>;
};
export const ForgotForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty } = { ...formik };
  const dispatch = useAppDispatch();
  const forgotButtonStatus = useAppSelector(getForgotButtonStatus);
  const forgotFieldsStatus = useAppSelector(getForgotFieldsStatus);

  useEffect(() => {
    if (isValid && dirty)
      dispatch(changeForgotButtonStatus({ forgotButtonStatus: buttonStatus.ACTIVE }));
    else
      dispatch(changeForgotButtonStatus({ forgotButtonStatus: buttonStatus.DISABLED }));
  }, [isValid, dirty, dispatch]);

  return (
    <Form>
      <FormGroup>
        <EmailField name="email" label="Email" disabled={forgotFieldsStatus} />
        <Typography className={styles.span}>
          Enter your email address and we will send you further instructions
        </Typography>
        <SubmitButton label="Send Instructions" disabled={forgotButtonStatus} />
      </FormGroup>
    </Form>
  );
};
