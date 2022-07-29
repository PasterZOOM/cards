import React from 'react';

import image from 'assets/images/error404.png';
import style from 'common/components/Error404/Error404.module.css';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Error404 = (): ReturnComponentType => (
  <div className={style.onStyle}>
    <img src={image} alt="Ошибка 404" />
  </div>
);
