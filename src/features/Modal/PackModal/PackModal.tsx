import React from 'react';

import { Formik, FormikHelpers } from 'formik';
import { useSearchParams } from 'react-router-dom';

import { UpdatePackDataType } from 'api/DataTypes';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualPacksParams } from 'common/utils/getActualParams';
import { createPack, updatePack } from 'features/Cards/Packs/packsReducer';
import { closeModal } from 'features/Modal/modalReduscer';
import { getModalTitle, getPackData } from 'features/Modal/modalSelectors';
import { PackModalForm } from 'features/Modal/PackModal/PackModalForm/PackModalForm';
import { PackModalFormType } from 'features/Modal/PackModal/PackModalForm/PackModalFormType';
import { validatePackModalForm } from 'features/Modal/PackModal/PackModalForm/validatePackModalForm';

export const PackModal = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector(getPackData) as UpdatePackDataType & { loadPacks: boolean };
  const title = useAppSelector(getModalTitle);

  const params = getActualPacksParams(searchParams);

  const submitModal = async (
    values: PackModalFormType,
    { setSubmitting }: FormikHelpers<PackModalFormType>,
  ): Promise<void> => {
    if (title === modal.ADD_PACK) {
      await dispatch(
        createPack({
          data: {
            name: values.packName,
            private: values.packPrivate,
          },
          params,
        }),
      );
    }

    if (title === modal.EDIT_PACK) {
      await dispatch(
        updatePack({
          data: {
            _id: data._id,
            name: values.packName,
            private: values.packPrivate,
          },
          params,
          loadPacks: data.loadPacks,
        }),
      );
    }
    dispatch(closeModal());
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        packName: data.name,
        packPrivate: data.private,
      }}
      validationSchema={validatePackModalForm}
      onSubmit={submitModal}
    >
      {formik => <PackModalForm formik={formik} />}
    </Formik>
  );
};
