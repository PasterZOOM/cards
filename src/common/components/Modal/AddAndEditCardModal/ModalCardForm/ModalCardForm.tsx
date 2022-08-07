import React from 'react';

import Button from '@mui/material/Button/Button';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import style from '../AddAndEditCardModal.module.scss';

import { ModalCardFormTypes } from './modalCardFormType';

import { EmailField } from 'common/components/Forms/EmailField/EmailField';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  formik: FormikProps<ModalCardFormTypes>;
  handleClose: () => void;
};
export const ModalCardForm: React.FC<PropsType> = ({
  formik,
  handleClose,
}): ReturnComponentType => {
  const { isValid, dirty, isSubmitting } = { ...formik };

  return (
    <Form>
      <FormGroup>
        <div className={style.input}>
          <EmailField name="question" label="Question" disabled={isSubmitting} />
          <EmailField name="answer" label="Answer" disabled={isSubmitting} />
        </div>

        <div className={style.buttonContainer}>
          <Button onClick={handleClose} className={style.btn} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
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
