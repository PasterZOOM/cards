import React from 'react';

import { TextField } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import { Form, FormikProps, useField } from 'formik';

import style from '../AddAndEditCardModal.module.scss';

import { ModalCardFormTypes } from './modalCardFormType';

import { Selected } from 'common/components/Selected/Selected';
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
  const [fieldQuestion, metaQuestion] = useField('question');
  const [fieldAnswer, metaAnswer] = useField('answer');

  return (
    <Form>
      <FormGroup>
        <div className={style.select}>
          <Selected />
        </div>

        <FormControl className={style.input} fullWidth variant="standard">
          <TextField
            label="Question"
            {...fieldQuestion}
            variant="standard"
            name="question"
          />
          {metaQuestion.touched && metaQuestion.error && (
            <FormHelperText error>{metaQuestion.error}</FormHelperText>
          )}
        </FormControl>
        <FormControl className={style.input} fullWidth variant="standard">
          <TextField label="Answer" {...fieldAnswer} variant="standard" name="answer" />
          {metaAnswer.touched && metaAnswer.error && (
            <FormHelperText error>{metaAnswer.error}</FormHelperText>
          )}
        </FormControl>

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
