import React from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import styles from './CardModalForm.module.scss';

import { ModalButtonGroup } from 'common/components/Buttons/ModalButtonGroup/ModalButtonGroup';
import { ProjectTextField } from 'common/components/Forms/ProjectTextField/ProjectTextField';
import { Selected } from 'common/components/Selected/Selected';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { CardModalFormTypes } from 'features/Modal/CardsModal/ModalCardForm/CardModalFormType';
import { closeModal } from 'features/Modal/modalReducer';

type PropsType = {
  formik: FormikProps<CardModalFormTypes>;
};
export const CardModalForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, dirty, isSubmitting } = { ...formik };
  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Form>
      <FormGroup className={styles.main}>
        <div className={styles.select}>
          <Selected />
        </div>
        <div className={styles.fields}>
          <ProjectTextField name="question" label="Question" disabled={isSubmitting} />
          <ProjectTextField name="answer" label="Answer" disabled={isSubmitting} />
        </div>
        <ModalButtonGroup onClose={onClose} dirty={dirty} isValid={isValid} />
      </FormGroup>
    </Form>
  );
};
