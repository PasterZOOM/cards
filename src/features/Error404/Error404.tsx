import React from 'react';

import style from './Error404.module.css';

import image from 'assets/images/error404.png';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Error404 = (): ReturnComponentType => (
  <div className={style.onStyle}>
    <img src={image} alt="Ошибка 404" />
  </div>
);
