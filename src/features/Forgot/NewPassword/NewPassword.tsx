import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik, FormikHelpers } from 'formik';

import styles from './NewPassword.module.css';

import { NewPasswordForm } from 'features/Forgot/NewPassword/NewPasswordForm/NewPasswordForm';
import { validateNewPasswordForm } from 'features/Forgot/NewPassword/NewPasswordForm/validateNewPasswordForm';
import { NewPasswordFormType } from 'features/Forgot/NewPassword/NewPasswordTypes';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NewPassword = (): ReturnComponentType => {
  const submitNewPasswordForm = async (
    values: NewPasswordFormType,
    formikHelpers: FormikHelpers<NewPasswordFormType>,
  ): Promise<void> => {
    formikHelpers.setSubmitting(false);
  };

  return (
    <Paper elevation={3} className={styles.main}>
      <Typography className={styles.title}>Create new password</Typography>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={validateNewPasswordForm}
        onSubmit={submitNewPasswordForm}
        validateOnMount={false}
      >
        {formik => <NewPasswordForm formik={formik} />}
      </Formik>
    </Paper>
  );
};
