import React from 'react';

import { Formik } from 'formik';

import { BasicModal } from '../BasicModal/BasicModal';

import style from './AddAndEditCardModal.module.scss';
import { ModalCardForm } from './ModalCardForm/ModalCardForm';
import { ModalCardFormTypes } from './ModalCardForm/modalCardFormType';
import { validateCreateAndEditCard } from './ModalCardForm/modalValidateCard';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  title: string;
  open: boolean;
  handleClose: () => void;
  answer?: string;
  question?: string;
  callBack: (values: ModalCardFormTypes) => void;
};

export const AddAndEditCardModal: React.FC<PropsType> = ({
  open,
  handleClose,
  callBack,
  answer,
  question,
  title,
}): ReturnComponentType => {
  const submitLoginForm = (values: ModalCardFormTypes): void => {
    callBack(values);
    handleClose();
  };

  return (
    <BasicModal title={title} handleClose={handleClose} open={open}>
      <div className={style.form}>
        <Formik
          initialValues={{ answer: answer || '', question: question || '' }}
          validationSchema={validateCreateAndEditCard}
          onSubmit={submitLoginForm}
        >
          {formik => <ModalCardForm handleClose={handleClose} formik={formik} />}
        </Formik>
      </div>
    </BasicModal>
  );
};
