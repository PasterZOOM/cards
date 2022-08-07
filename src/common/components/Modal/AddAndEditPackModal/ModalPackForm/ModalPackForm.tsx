import React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import { EmailField } from '../../../Forms/EmailField/EmailField';
import style from '../AddAndEditPackModal.module.scss';

import { ModalPackFormTypes } from './modalPackFormType';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<ModalPackFormTypes>;
  handleClose: () => void;
};
export const ModalPackForm: React.FC<PropsType> = ({
  formik,
  handleClose,
}): ReturnComponentType => {
  const { isValid, handleChange, values, dirty } = { ...formik };

  return (
    <Form>
      <FormGroup>
        <div className={style.input}>
          <EmailField name="namePack" label="name Pack" />
        </div>

        <div className={style.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                className={style.checkBox}
                name="privatePack"
                onChange={handleChange}
                checked={values.privatePack}
              />
            }
            label="Private pack"
          />
        </div>

        <div className={style.buttonContainer}>
          <Button onClick={handleClose} className={style.btn} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || !dirty}
            className={style.btn}
            variant="contained"
          >
            Save
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
};
