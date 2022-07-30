import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import style from './Paginator.module.css';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type PaginatorPropsType = {
  totalItemsCount: number;
  pageSize: number;
  portionSize: number;
};

export const Paginator: React.FC<PaginatorPropsType> = ({
  totalItemsCount,
  pageSize,
  portionSize,
}): ReturnComponentType => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <ArrowBackIcon
          className={style.icon}
          color="primary"
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        />
      )}

      {portionCount > portionNumber && (
        <ArrowForwardIcon
          className={style.icon}
          color="primary"
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        />
      )}
    </div>
  );
};
