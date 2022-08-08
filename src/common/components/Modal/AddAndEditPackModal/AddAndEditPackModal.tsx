import React from 'react';

import { Formik } from 'formik';

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
    <BasicModal title={title} handleClose={handleClose} open={open}>
      <div className={style.form}>
        <Formik
          initialValues={{ namePack: initialName as string, privatePack: false }}
          validationSchema={validateCreateAndEditPack}
          onSubmit={submitLoginForm}
        >
          {formik => <ModalPackForm handleClose={handleClose} formik={formik} />}
        </Formik>
      </div>
    </BasicModal>
  );
};
