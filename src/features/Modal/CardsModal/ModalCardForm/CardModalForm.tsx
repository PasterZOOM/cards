import React, { useState } from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import { ImageInput } from '../../../../common/components/Forms/ImageInput/ImageInput';
import { modal } from '../../../../common/enums/modal';
import { Nullable } from '../../../../common/types/Nullable';

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
  setQuestion: (value: string) => void;
  question: string;
  title: Nullable<modal>;
};
export const CardModalForm: React.FC<PropsType> = ({
  formik,
  setQuestion,
  question,
  title,
}): ReturnComponentType => {
  const { isValid, dirty, isSubmitting, values } = {
    ...formik,
  };

  const dispatch = useAppDispatch();
  const [val, setVal] = useState(values);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const changeQuestionValue = (value: string): void => {
    values.questionImg = value;
    setVal({ ...val, questionImg: value });
    setIsDirty(true);
  };

  const changeAnswerValue = (value: string): void => {
    values.answerImg = value;
    setVal({ ...val, answerImg: value });
    setIsDirty(true);
  };

  const onClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Form>
      <FormGroup className={styles.main}>
        {title === modal.ADD_CARD ? (
          <div className={styles.select}>
            <Selected question={question} callback={setQuestion} />
          </div>
        ) : null}

        <div className={styles.fields}>
          {question === 'text' ? (
            <div>
              <ProjectTextField
                name="question"
                label="Question"
                disabled={isSubmitting}
              />
              <ProjectTextField name="answer" label="Answer" disabled={isSubmitting} />
            </div>
          ) : (
            <div>
              <ImageInput
                name="questionImg"
                title="Upload question"
                value={values.questionImg}
                changeValue={changeQuestionValue}
              />
              <ImageInput
                name="answerImg"
                title="Upload answer"
                value={values.answerImg}
                changeValue={changeAnswerValue}
              />
            </div>
          )}
        </div>
        {question === 'text' ? (
          <ModalButtonGroup onClose={onClose} dirty={dirty} isValid={isValid} />
        ) : (
          <ModalButtonGroup
            onClose={onClose}
            dirty={isDirty}
            isValid={!!(values.questionImg && values.answerImg)}
          />
        )}
      </FormGroup>
    </Form>
  );
};
