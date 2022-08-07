import React from 'react';

import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import { Form, FormikProps, useField } from 'formik';

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
  const [field, meta] = useField('namePack');

  return (
    <Form>
      <FormGroup>
        <FormControl className={style.input} fullWidth variant="standard">
          <TextField
            label="Name Pack"
            {...field}
            variant="standard"
            name="namePack"
            value={values.namePack}
            onChange={handleChange}
          />
          {meta.touched && meta.error && (
            <FormHelperText error>{meta.error}</FormHelperText>
          )}
        </FormControl>

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
