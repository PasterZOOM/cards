import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Pagination from '@mui/material/Pagination';

import { ReturnComponentType } from '../../types/ReturnComponentType';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtil';

import style from './Paginator.module.scss';

type PaginatorPropsType = {
  cardPacksTotalCount: number;
  pageCount: number | undefined;
  userId?: string;
  changePage: (page: number) => void;
  changePageCount: (pageCount: number) => void;
};

export const Paginator: React.FC<PaginatorPropsType> = ({
  cardPacksTotalCount,
  pageCount,
  userId,
  changePage,
  changePageCount,
}): ReturnComponentType => {
  let pageCountPag = null;

  pageCountPag = parseInt(getLocalStorage('pageCount') as string, 10) || pageCount;

  const pagesCount = Math.ceil(cardPacksTotalCount / (pageCountPag || 1));

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setPage(1);

    return () => {
      changePage(1);
    };
  }, [userId, pageCountPag]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number): void => {
      changePage(value);

      setPage(value);
    },
    [],
  );

  const onSelectClickHandler = useCallback((event: SelectChangeEvent<number>): void => {
    setLocalStorage('pageCount', event.target.value.toString());
    changePage(1);
    changePageCount(+event.target.value);
  }, []);

  return (
    <div className={style.container}>
      <Pagination count={pagesCount} page={page} onChange={handleChange} />
      <p className={style.text}>Show</p>

      <Select
        className={style.select}
        size="small"
        value={pageCountPag}
        onChange={onSelectClickHandler}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <p className={style.text}>Cards per Page</p>
    </div>
  );
};
