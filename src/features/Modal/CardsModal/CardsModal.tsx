import React, { useState } from 'react';

import { Formik, FormikHelpers } from 'formik';
import { useSearchParams } from 'react-router-dom';

import { CreateCardDataType, UpdateCardDataType } from 'api/DataTypes';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualCardsParams } from 'common/utils/getActualParams';
import { createCard, updateCard } from 'features/Cards/Cards/cardsReducer';
import { CardModalForm } from 'features/Modal/CardsModal/ModalCardForm/CardModalForm';
import { CardModalFormTypes } from 'features/Modal/CardsModal/ModalCardForm/CardModalFormType';
import { validateCardModalForm } from 'features/Modal/CardsModal/ModalCardForm/validateCardFormModal';
import { closeModal } from 'features/Modal/modalReducer';
import { getModalTitle, getPackData } from 'features/Modal/modalSelectors';

export const CardsModal = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const createData = useAppSelector(getPackData) as CreateCardDataType;
  const updateData = useAppSelector(getPackData) as UpdateCardDataType;
  const title = useAppSelector(getModalTitle);

  const params = getActualCardsParams(searchParams);
  const format = updateData.answerImg || updateData.questionImg ? 'image' : 'text';
  const [question, setQuestion] = useState<string>(format);

  const submitModal = async (
    values: CardModalFormTypes,
    { setSubmitting }: FormikHelpers<CardModalFormTypes>,
  ): Promise<void> => {
    if (title === modal.ADD_CARD) {
      await dispatch(
        createCard({
          data:
            question === 'text'
              ? {
                  answer: values.answer,
                  question: values.question,
                  cardsPack_id: createData.cardsPack_id,
                }
              : {
                  answerImg: values.answerImg,
                  questionImg: values.questionImg,
                  cardsPack_id: createData.cardsPack_id,
                },
          params,
        }),
      );
    }

    if (title === modal.EDIT_CARD) {
      await dispatch(
        updateCard({
          data: {
            answer: values.answer,
            question: values.question,
            _id: updateData._id,
            answerImg: values.answerImg,
            questionImg: values.questionImg,
          },
          params,
        }),
      );
    }
    dispatch(closeModal());
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        answer: updateData.answer || '',
        question: updateData.question || '',
        answerImg: updateData.answerImg || '',
        questionImg: updateData.questionImg || '',
      }}
      validationSchema={question === 'text' ? validateCardModalForm : null}
      onSubmit={submitModal}
    >
      {formik => (
        <CardModalForm
          title={title}
          question={question}
          setQuestion={setQuestion}
          formik={formik}
        />
      )}
    </Formik>
  );
};
