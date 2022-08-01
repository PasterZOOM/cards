import * as React from 'react';
import { useCallback } from 'react';

import TablePagination from '@mui/material/TablePagination';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  changePacksPage,
  changePacksPageCount,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { getPageCountCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsSelectors';
import { getCardPacksTotalCount } from 'features/Cards/CardPacks/cardPacksSelectors';

export const Paginator: React.FC = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const pageCount = useAppSelector(getPageCountCardPacksParams);
  const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(pageCount as number);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
      dispatch(changePacksPage({ page: newPage + 1 }));
      setPage(newPage);
    },
    [dispatch],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      dispatch(changePacksPageCount({ pageCount: parseInt(event.target.value, 10) }));
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [dispatch],
  );

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
