import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik, FormikHelpers } from 'formik';
import { Navigate, useParams } from 'react-router-dom';

import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { sendNewPassword } from 'features/Auth/Forgot/forgotReducer';
import styles from 'features/Auth/Forgot/NewPassword/NewPassword.module.css';
import { NewPasswordForm } from 'features/Auth/Forgot/NewPassword/NewPasswordForm/NewPasswordForm';
import { validateNewPasswordForm } from 'features/Auth/Forgot/NewPassword/NewPasswordForm/validateNewPasswordForm';
import { NewPasswordFormType } from 'features/Auth/Forgot/NewPassword/NewPasswordTypes';

export const NewPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const redirect = useAppSelector(state => state.forgot.redirect);
  const { token } = useParams();

  const submitNewPasswordForm = async (
    values: NewPasswordFormType,
    formikHelpers: FormikHelpers<NewPasswordFormType>,
  ): Promise<void> => {
    await dispatch(
      sendNewPassword({
        password: values.password,
        resetPasswordToken: token as string,
      }),
    );
    formikHelpers.setSubmitting(false);
  };

  if (redirect) return <Navigate to={path.LOGIN} />;

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
