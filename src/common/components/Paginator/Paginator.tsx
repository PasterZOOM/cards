import React, { useCallback, useEffect, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from 'react-router-dom';

import { ReturnComponentType } from '../../types/ReturnComponentType';

import styles from './Paginator.module.scss';

import { startPageCount } from 'common/constants/projectConstants';

type PaginatorPropsType = {
  cardPacksTotalCount: number;
};

export const Paginator: React.FC<PaginatorPropsType> = ({
  cardPacksTotalCount,
}): ReturnComponentType => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [pageCount, setPageCount] = useState<number>(
    Number(searchParams.get('pageCount')) || startPageCount,
  );

  const pagesCount = Math.ceil(cardPacksTotalCount / pageCount);

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number): void => {
      const queryParams: { page?: string } = {};

      queryParams.page = String(value);
      setPage(value);

      setSearchParams({
        ...Object.fromEntries(searchParams),
        ...queryParams,
      });
    },
    [searchParams, setSearchParams],
  );

  const onSelectClickHandler = useCallback(
    (event: SelectChangeEvent<number>): void => {
      const queryParams: { pageCount?: string } = {};

      queryParams.pageCount = String(event.target.value);
      setPageCount(+event.target.value);
      setSearchParams({
        ...Object.fromEntries(searchParams),
        ...queryParams,
      });
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <Pagination count={pagesCount} page={page} onChange={handleChange} />
      <p className={styles.text}>Show</p>

      <Select
        className={styles.select}
        size="small"
        value={pageCount}
        onChange={onSelectClickHandler}
        IconComponent={KeyboardArrowDownIcon}
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
