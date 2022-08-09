import React from 'react';

import { Formik } from 'formik';

import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'common/utils/modalUtils';
import { createPack, updatePack } from 'features/Cards/Packs/packsReducer';
import { getModalOpenStatus, getPackModal } from 'features/Modal/modalSelectors';
import { ModalPackForm } from 'features/Modal/PackModal/ModalPackForm/ModalPackForm';
import { ModalPackFormTypes } from 'features/Modal/PackModal/ModalPackForm/modalPackFormType';
import { validateCreateAndEditPack } from 'features/Modal/PackModal/ModalPackForm/modalValidatePack';

export const PackModal = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const packModal = useAppSelector(getPackModal);
  const open = useAppSelector(getModalOpenStatus);

  const submitModal = async (values: ModalPackFormTypes): Promise<void> => {
    if (open === modal.CREATE_PACK) {
      await dispatch(
        createPack({
          name: values.packName,
          private: values.packPrivate,
        }),
      );
      closeModal(dispatch);
    }

    if (open === modal.UPDATE_PACK) {
      await dispatch(
        updatePack({
          _id: packModal._id,
          name: values.packName,
          private: values.packPrivate,
        }),
      );
      closeModal(dispatch);
    }
  };

  return (
    <Formik
      initialValues={{ packName: packModal.name, packPrivate: packModal.private }}
      validationSchema={validateCreateAndEditPack}
      onSubmit={submitModal}
    >
      {formik => <ModalPackForm formik={formik} />}
    </Formik>
  );
};
