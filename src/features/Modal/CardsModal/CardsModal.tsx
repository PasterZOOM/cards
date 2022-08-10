import React from 'react';

import { Formik, FormikHelpers } from 'formik';

import { UpdateCardDataType } from 'api/DataTypes';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { createCard, updateCard } from 'features/Cards/Cards/cardsReducer';
import { CardModalForm } from 'features/Modal/CardsModal/ModalCardForm/CardModalForm';
import { CardModalFormTypes } from 'features/Modal/CardsModal/ModalCardForm/CardModalFormType';
import { validateCardModalForm } from 'features/Modal/CardsModal/ModalCardForm/validateCardFormModal';
import { closeModal } from 'features/Modal/modalReduscer';
import { getModalTitle, getPackData } from 'features/Modal/modalSelectors';

export const CardsModal = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getPackData) as UpdateCardDataType;
  const title = useAppSelector(getModalTitle);

  const submitModal = async (
    values: CardModalFormTypes,
    { setSubmitting }: FormikHelpers<CardModalFormTypes>,
  ): Promise<void> => {
    if (title === modal.ADD_CARD) {
      await dispatch(
        createCard({
          answer: values.answer,
          question: values.question,
          cardsPack_id: data._id,
        }),
      );
    }

    if (title === modal.EDIT_CARD) {
      await dispatch(
        updateCard({
          answer: values.answer,
          question: values.question,
          _id: data._id,
        }),
      );
    }
    dispatch(closeModal());
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ answer: data.answer, question: data.question }}
      validationSchema={validateCardModalForm}
      onSubmit={submitModal}
    >
      {formik => <CardModalForm formik={formik} />}
    </Formik>
  );
};
