import { MouseEvent, ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { DataTableHead } from 'common/components/DataTable/DataTableHead';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export type PackDataType = {
  packTitle: string;
  cardsCount: number;
  updateDate: string;
  creatorName: string;
  actions: string;
};

function createData(
  packTitle: string,
  cardsCount: number,
  updateDate: string,
  creatorName: string,
  actions: string,
): PackDataType {
  return { packTitle, cardsCount, updateDate, creatorName, actions };
}

const rows: PackDataType[] = [
  // eslint-disable-next-line no-magic-numbers
  createData('Pack Name', 4, '25.03.2021', 'Ivan Ivanov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Name Pack', 37, '19.03.2021', 'Petr Petrov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Pack Name', 18, '19.03.2021', 'Ivan Petrov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Name Pack', 0, '20.03.2021', 'Petr Ivanov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Pack Name', 11, '20.03.2021', 'Ivan Ivanov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Name Pack', 9, '20.03.2021', 'Petr Petrov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Pack Name', 8, '21.03.2021', 'Petr Ivanov', 'icons'),
  // eslint-disable-next-line no-magic-numbers
  createData('Name Pack', 0, '21.03.2021', 'Ivan Ivanov', 'icons'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const DataTable = (): ReturnComponentType => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof PackDataType>('updateDate');
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-magic-numbers
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof PackDataType,
  ): void => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const fiveRowsPerPage = 5;
  const tenRowsPerPage = 10;
  const twentyFiveRowsPerPage = 25;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 1080 }} aria-labelledby="tableTitle">
            <DataTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.packTitle + row.cardsCount + row.updateDate}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.packTitle}
                      </TableCell>
                      <TableCell align="right">{row.cardsCount}</TableCell>
                      <TableCell align="right">{row.updateDate}</TableCell>
                      <TableCell align="right">{row.creatorName}</TableCell>
                      <TableCell align="right">{row.actions}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[fiveRowsPerPage, tenRowsPerPage, twentyFiveRowsPerPage]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
