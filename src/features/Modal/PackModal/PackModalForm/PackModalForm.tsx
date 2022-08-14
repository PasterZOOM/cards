import React, { ChangeEvent, useState } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button/Button';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import styles from './PackModalForm.module.scss';

import { ModalButtonGroup } from 'common/components/Buttons/ModalButtonGroup/ModalButtonGroup';
import { ProjectTextField } from 'common/components/Forms/ProjectTextField/ProjectTextField';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { closeModal } from 'features/Modal/modalReduscer';
import { PackModalFormType } from 'features/Modal/PackModal/PackModalForm/PackModalFormType';

type PropsType = {
  formik: FormikProps<PackModalFormType>;
};
export const PackModalForm: React.FC<PropsType> = ({ formik }): ReturnComponentType => {
  const { isValid, handleChange, values, dirty, isSubmitting } = { ...formik };
  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch(closeModal());
  };

  const [errorSize, setErrorSize] = useState<null | string>(null);

  const maxSize = 4000000;

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < maxSize) {
        convertFileToBase64(file, (file64: string) => {
          setErrorSize(null);
          values.deckCover = file64;
        });
      } else {
        setErrorSize('Файл слишком большого размера');
      }
    }
  };

  const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const file64 = reader.result as string;

      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form>
      <FormGroup className={styles.main}>
        <div className={styles.cover}>
          <span>cover</span>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
            <Button variant="contained" component="span">
              Upload button
            </Button>
          </label>
        </div>
        {values.deckCover && !errorSize ? (
          <img className={styles.image} src={values.deckCover} alt="" />
        ) : null}
        {errorSize ? <span className={styles.error}>{errorSize}</span> : null}

        <ProjectTextField name="packName" label="Name Pack" disabled={isSubmitting} />

        <FormControlLabel
          className={styles.checkbox}
          label="Private cards"
          control={
            <Checkbox
              name="packPrivate"
              onChange={handleChange}
              checked={values.packPrivate}
            />
          }
        />
        <ModalButtonGroup onClose={onClose} dirty={dirty} isValid={isValid} />
      </FormGroup>
    </Form>
  );
};
