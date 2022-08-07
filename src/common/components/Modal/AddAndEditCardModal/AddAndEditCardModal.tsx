import React from 'react';

import { Formik } from 'formik';

import closeIcon from '../../../../assets/images/closeIcon.svg';
import { BasicModal } from '../BasicModal/BasicModal';

import style from './AddAndEditCardModal.module.scss';
import { ModalCardForm } from './ModalCardForm/ModalCardForm';
import { ModalCardFormTypes } from './ModalCardForm/modalCardFormType';
import { validateCreateAndEditCard } from './ModalCardForm/modalValidateCard';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  callBack: (values: ModalCardFormTypes) => void;
};

export const AddAndEditCardModal: React.FC<PropsType> = ({
  open,
  handleClose,
  title,
  callBack,
}): ReturnComponentType => {
  const submitLoginForm = (values: ModalCardFormTypes): void => {
    callBack(values);
    handleClose();
  };

  return (
    <BasicModal handleClose={handleClose} open={open}>
      <div className={style.main}>
        <div className={style.header}>
          <h3 className={style.title}>{title}</h3>
          <img className={style.icon} src={closeIcon} alt="" />
        </div>
        <div className={style.line} />
        <div className={style.form}>
          <Formik
            initialValues={{ answer: '', question: '' }}
            validationSchema={validateCreateAndEditCard}
            onSubmit={submitLoginForm}
          >
            {formik => <ModalCardForm handleClose={handleClose} formik={formik} />}
          </Formik>
        </div>
      </div>
    </BasicModal>
  );
};
