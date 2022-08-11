import React from 'react';

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
import { closeModal } from 'features/Modal/modalReduscer';
import { getModalTitle, getPackData } from 'features/Modal/modalSelectors';

export const CardsModal = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const createData = useAppSelector(getPackData) as CreateCardDataType;
  const updateData = useAppSelector(getPackData) as UpdateCardDataType;
  const title = useAppSelector(getModalTitle);

  const params = getActualCardsParams(searchParams);

  const submitModal = async (
    values: CardModalFormTypes,
    { setSubmitting }: FormikHelpers<CardModalFormTypes>,
  ): Promise<void> => {
    if (title === modal.ADD_CARD) {
      await dispatch(
        createCard({
          data: {
            answer: values.answer,
            question: values.question,
            cardsPack_id: createData.cardsPack_id,
          },
          params,
        }),
      );
    }

    if (title === modal.EDIT_CARD) {
      await dispatch(
        updateCard({
          data: { answer: values.answer, question: values.question, _id: updateData._id },
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
      }}
      validationSchema={validateCardModalForm}
      onSubmit={submitModal}
    >
      {formik => <CardModalForm formik={formik} />}
    </Formik>
  );
};
