import React from 'react';

import { Formik } from 'formik';

import closeIcon from '../../../../assets/images/closeIcon.svg';
import { BasicModal } from '../BasicModal/BasicModal';

import style from './AddAndEditPackModal.module.scss';
import { ModalPackForm } from './ModalPackForm/ModalPackForm';
import { ModalPackFormTypes } from './ModalPackForm/modalPackFormType';
import { validateCreateAndEditPack } from './ModalPackForm/modalValidatePack';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PropsType = {
  open: boolean;
  handleClose: () => void;
  title: string;
  callBack: (values: ModalPackFormTypes) => void;
  editableName?: string;
};

export const AddAndEditPackModal: React.FC<PropsType> = ({
  open,
  handleClose,
  title,
  callBack,
  editableName,
}): ReturnComponentType => {
  const submitLoginForm = (values: ModalPackFormTypes): void => {
    callBack(values);
    handleClose();
  };

  const initialName = title === 'Edit pack' ? editableName : '';

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
            initialValues={{ namePack: initialName as string, privatePack: false }}
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
