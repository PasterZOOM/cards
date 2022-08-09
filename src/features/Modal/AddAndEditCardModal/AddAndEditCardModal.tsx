import React from 'react';

import { Formik } from 'formik';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import style from 'features/Modal/AddAndEditCardModal/AddAndEditCardModal.module.scss';
import { ModalCardForm } from 'features/Modal/AddAndEditCardModal/ModalCardForm/ModalCardForm';
import { ModalCardFormTypes } from 'features/Modal/AddAndEditCardModal/ModalCardForm/modalCardFormType';
import { validateCreateAndEditCard } from 'features/Modal/AddAndEditCardModal/ModalCardForm/modalValidateCard';

type PropsType = {
  handleClose: () => void;
  answer?: string;
  question?: string;
  callBack: (values: ModalCardFormTypes) => void;
};

export const AddAndEditCardModal: React.FC<PropsType> = ({
  handleClose,
  callBack,
  answer,
  question,
}): ReturnComponentType => {
  const submitLoginForm = (values: ModalCardFormTypes): void => {
    callBack(values);
    handleClose();
  };

  return (
    <div className={style.form}>
      <Formik
        initialValues={{ answer: answer || '', question: question || '' }}
        validationSchema={validateCreateAndEditCard}
        onSubmit={submitLoginForm}
      >
        {formik => <ModalCardForm handleClose={handleClose} formik={formik} />}
      </Formik>
    </div>
  );
};
