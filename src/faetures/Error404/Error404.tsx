import React from 'react';

import style from './Error404.module.css';

import image from 'assets/images/error404.png';

export const Error404: React.FC = () => (
  <div className={style.onStyle}>
    <img src={image} alt="Ошибка 404" />
  </div>
);
