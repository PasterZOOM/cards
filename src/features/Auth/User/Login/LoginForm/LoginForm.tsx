import React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';
import { NavLink } from 'react-router-dom';

import { LoginDataType } from 'api/DataTypes';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { PasswordField } from 'common/components/Forms/PasswordField/PasswordField';
import { ProjectTextField } from 'common/components/Forms/ProjectTextField/ProjectTextField';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import style from 'features/Auth/User/Login/Login.module.css';

type PropsType = {
  formik: FormikProps<LoginDataType>;
};
export const LoginForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, handleChange, values, dirty, isSubmitting } = { ...formik };

  return (
    <Form>
      <FormGroup>
        <ProjectTextField name="email" label="Email" disabled={isSubmitting} />
        <PasswordField name="password" label="Password" disabled={isSubmitting} />
        <div className={style.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                onChange={handleChange}
                checked={values.rememberMe}
              />
            }
            label="Remember Me"
          />
        </div>
        <div className={style.linkToPassword}>
          <NavLink to={path.FORGOT_PASSWORD}>Forgot password?</NavLink>
        </div>
        <GeneralButton
          label="Sing Up"
          disabled={!isValid || !dirty || isSubmitting}
          type="submit"
        />

        <div className={style.text}>Dont have an account?</div>

        <div className={style.linkToRegistration}>
          <NavLink to={path.REGISTRATION}>Sign Up</NavLink>
        </div>
      </FormGroup>
    </Form>
  );
};
