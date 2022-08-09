import React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { Form, FormikProps, useField } from 'formik';

import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { MultiButton } from 'common/components/Buttons/MultiButton/MultiButton';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'common/utils/modalUtils';
import styles from 'features/Modal/PackModal/ModalPackForm/ModalPackForm.module.scss';
import { ModalPackFormTypes } from 'features/Modal/PackModal/ModalPackForm/modalPackFormType';

type PropsType = {
  formik: FormikProps<ModalPackFormTypes>;
};
export const ModalPackForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const { isValid, handleChange, values, dirty } = { ...formik };
  const [field, meta] = useField('packName');

  return (
    <Form>
      <FormGroup className={styles.main}>
        <FormControl fullWidth variant="standard" className={styles.field}>
          <InputLabel>Name Pack</InputLabel>
          <Input margin="dense" {...field} name="packName" />
          {meta.touched && meta.error && (
            <FormHelperText error>{meta.error}</FormHelperText>
          )}
        </FormControl>

        <FormControlLabel
          className={styles.checkbox}
          label="Private cards"
          control={
            <Checkbox
              name="packPrivate"
              onChange={handleChange}
              checked={values.packPrivate}
            />
          }
        />

        <div className={styles.buttonGroup}>
          <MultiButton
            label="Cancel"
            onClick={() => closeModal(dispatch)}
            color="white"
          />
          <GeneralButton label="Save" type="submit" disabled={!isValid || !dirty} />
        </div>
      </FormGroup>
    </Form>
  );
};
