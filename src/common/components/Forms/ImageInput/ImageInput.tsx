import React, { ChangeEvent, useState } from 'react';

import Button from '@mui/material/Button/Button';
import FormControl from '@mui/material/FormControl';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

import styles from './ImageInput.module.scss';

type ImageInputPropsType = {
  value: string;
  changeValue: (value: string) => void;
  title: string;
  name: string;
};

export const ImageInput: React.FC<ImageInputPropsType> = ({
  value,
  changeValue,
  title,
  name,
  /* handleChange, */
}): ReturnComponentType => {
  const [errorSize, setErrorSize] = useState<null | string>(null);

  const maxSize = 4000000;

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < maxSize) {
        convertFileToBase64(file, (file64: string) => {
          setErrorSize(null);
          changeValue(file64);
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
    <FormControl
      style={{ marginBottom: '30px' }}
      className={styles.cover}
      fullWidth
      variant="standard"
    >
      <label htmlFor={name}>
        <Button variant="contained" component="span" fullWidth>
          {title}
        </Button>
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onChange={uploadHandler}
        style={{ display: 'none' }}
      />
      {value && !errorSize ? <img className={styles.image} src={value} alt="" /> : null}
      {errorSize ? <span className={styles.error}>{errorSize}</span> : null}
    </FormControl>
  );
};
