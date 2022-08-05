import * as React from 'react';
import { useCallback } from 'react';

import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Pagination from '@mui/material/Pagination';

import { ReturnComponentType } from '../../types/ReturnComponentType';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtil';

import styles from './Paginator.module.scss';

type PaginatorPropsType = {
  paramsPage: number | undefined;
  cardPacksTotalCount: number;
  pageCount: number | undefined;
  changePage: (page: number) => void;
  changePageCount: (pageCount: number) => void;
};

export const Paginator: React.FC<PaginatorPropsType> = ({
  cardPacksTotalCount,
  pageCount,
  changePage,
  changePageCount,
  paramsPage,
}): ReturnComponentType => {
  const pageCountPag = parseInt(getLocalStorage('pageCount') as string, 10) || pageCount;

  const pagesCount = Math.ceil(cardPacksTotalCount / (pageCountPag || 1));

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number): void => {
      changePage(value);
    },
    [],
  );

  const onSelectClickHandler = useCallback((event: SelectChangeEvent<number>): void => {
    setLocalStorage('pageCount', event.target.value.toString());
    changePage(1);
    changePageCount(+event.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <Pagination count={pagesCount} page={paramsPage || 1} onChange={handleChange} />
      <p className={styles.text}>Show</p>

      <Select
        className={styles.select}
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
      <p className={styles.text}>Cards per Page</p>
    </div>
  );
};
