import React from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import styles from './PackModalForm.module.scss';

import { ModalButtonGroup } from 'common/components/Buttons/ModalButtonGroup/ModalButtonGroup';
import { ProjectTextField } from 'common/components/Forms/ProjectTextField/ProjectTextField';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'features/Modal/modalReduscer';
import { PackModalFormType } from 'features/Modal/PackModal/PackModalForm/PackModalFormType';

type PropsType = {
  formik: FormikProps<PackModalFormType>;
};
export const PackModalForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, handleChange, values, dirty, isSubmitting } = { ...formik };
  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Form>
      <FormGroup className={styles.main}>
        <ProjectTextField name="packName" label="Name Pack" disabled={isSubmitting} />

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
        <ModalButtonGroup onClose={onClose} dirty={dirty} isValid={isValid} />
      </FormGroup>
    </Form>
  );
};
