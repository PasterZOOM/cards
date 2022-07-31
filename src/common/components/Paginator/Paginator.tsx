import * as React from 'react';
import { useEffect } from 'react';

import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getPacks, setPageCount, setPageNumber } from 'features/Cards/Packs/packsReducer';

type PaginatorPropsType = {
  cardPacksTotalCount: number;
  pageCount: number;
  pageNumber: number;
};

export const Paginator: React.FC<PaginatorPropsType> = ({
  cardPacksTotalCount,
  pageCount,
  pageNumber,
}): ReturnComponentType => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPacks({ page: pageNumber, pageCount }));
  }, [pageNumber, pageCount]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ): void => {
    dispatch(setPageNumber({ page: newPage + 1 }));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    dispatch(setPageCount({ pageCount: parseInt(event.target.value, 10) }));
    dispatch(setPageNumber({ page: 1 }));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      showFirstButton
      showLastButton
      component="div"
      count={cardPacksTotalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
