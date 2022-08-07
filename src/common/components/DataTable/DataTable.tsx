import React, { MouseEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { useSearchParams } from 'react-router-dom';

import { DataTableBody } from 'common/components/DataTable/DataTableBody/DataTableBody';
import { DataTableHead } from 'common/components/DataTable/DataTableHead/DataTableHead';
import {
  CardData,
  DataKeys,
  Order,
  PackData,
} from 'common/components/DataTable/DataTableTypes';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { sortCardsHelper, sortPacksHelper } from 'common/utils/dataTableSortHelper';

type DataTableProps = {
  tableType: 'packs' | 'cards';
};

export const DataTable: React.FC<DataTableProps> = ({
  tableType,
}): ReturnComponentType => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<DataKeys>('actions');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRequestSort = (event: MouseEvent<unknown>, property: DataKeys): void => {
    const isAsc = orderBy === property && order === 'asc';

    if (tableType === 'packs')
      sortPacksHelper(property as keyof PackData, order, setSearchParams, searchParams);
    if (tableType === 'cards')
      sortCardsHelper(property as keyof CardData, order, setSearchParams, searchParams);

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 1080 }} aria-labelledby="tableTitle">
            <DataTableHead
              tableType={tableType}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <DataTableBody tableType={tableType} />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
