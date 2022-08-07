import React from 'react';

import { Formik } from 'formik';

import closeIcon from '../../../../assets/images/closeIcon.svg';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import { BasicModal } from '../BasicModal/BasicModal';

import style from './AddAndEditPackModal.module.scss';
import { ModalPackForm } from './ModalPackForm/ModalPackForm';
import { ModalPackFormTypes } from './ModalPackForm/modalPackFormType';
import { validateCreateAndEditPack } from './ModalPackForm/modalValidatePack';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  callBack: (values: ModalPackFormTypes) => void;
};

export const AddAndEditPackModal: React.FC<PropsType> = ({
  open,
  handleClose,
  title,
  callBack,
}): ReturnComponentType => {
  const submitLoginForm = (values: ModalPackFormTypes): void => {
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
            initialValues={{ namePack: '', privatePack: false }}
            validationSchema={validateCreateAndEditPack}
            onSubmit={submitLoginForm}
          >
            {formik => <ModalPackForm handleClose={handleClose} formik={formik} />}
          </Formik>
        </div>
      </div>
    </BasicModal>
  );
};
