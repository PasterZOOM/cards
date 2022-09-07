import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useSearchParams } from 'react-router-dom';

import { DataTableBody } from 'common/components/DataTable/DataTableBody/DataTableBody';
import { DataTableHead } from 'common/components/DataTable/DataTableHead/DataTableHead';
import {
  CardData,
  DataKeys,
  Order,
  PackData,
  TableType,
  UsersData,
} from 'common/components/DataTable/DataTableTypes';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  setCurrentOrder,
  setCurrentOrderBy,
  sortCardsHelper,
  sortPacksHelper,
  sortUsersHelper,
} from 'common/utils/dataTableSortHelper';
import {
  getActualCardsParams,
  getActualPacksParams,
  getActualUsersParams,
} from 'common/utils/getActualParams';

type DataTableProps = {
  tableType: TableType;
};

export const DataTable: React.FC<DataTableProps> = ({
  tableType,
}): ReturnComponentType => {
  const [searchParams, setSearchParams] = useSearchParams();
  const actualSortPackUrlValue = getActualPacksParams(searchParams).sortPacks;
  const actualSorCardUrlValue = getActualCardsParams(searchParams).sortCards;
  const actualSorUsersUrlValue = getActualUsersParams(searchParams).sortUsers;
  const [order, setOrder] = useState<Order>(
    tableType === 'packs'
      ? setCurrentOrder(actualSortPackUrlValue as string)
      : setCurrentOrder(actualSorCardUrlValue as string),
  );
  const [orderBy, setOrderBy] = useState<DataKeys>(
    tableType === 'packs'
      ? setCurrentOrderBy(actualSortPackUrlValue as string)
      : setCurrentOrderBy(actualSorCardUrlValue as string),
  );
  const table = useRef<OverlayScrollbarsComponent>(null);

  const handleRequestSort = (event: MouseEvent<unknown>, property: DataKeys): void => {
    const isAsc = orderBy === property && order === 'desc';

    if (tableType === 'packs')
      sortPacksHelper(property as keyof PackData, order, setSearchParams, searchParams);
    if (tableType === 'cards')
      sortCardsHelper(property as keyof CardData, order, setSearchParams, searchParams);
    if (tableType === 'users')
      sortUsersHelper(property as keyof UsersData, order, setSearchParams, searchParams);

    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  useEffect(() => {
    if (tableType === 'packs') {
      setOrder(setCurrentOrder(actualSortPackUrlValue as string));
      setOrderBy(setCurrentOrderBy(actualSortPackUrlValue as string));
    }
    if (tableType === 'cards') {
      setOrder(setCurrentOrder(actualSorCardUrlValue as string));
      setOrderBy(setCurrentOrderBy(actualSorCardUrlValue as string));
    }
    if (tableType === 'users') {
      setOrder(setCurrentOrder(actualSorUsersUrlValue as string));
      setOrderBy(setCurrentOrderBy(actualSorUsersUrlValue as string));
    }
  }, [actualSorCardUrlValue, actualSortPackUrlValue, searchParams, tableType]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <OverlayScrollbarsComponent
            ref={table}
            options={{
              scrollbars: {
                clickScrolling: true,
              },
            }}
          >
            <Table sx={{ minWidth: 1080 }} aria-labelledby="tableTitle">
              <DataTableHead
                tableType={tableType}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <DataTableBody tableType={tableType} />
            </Table>
          </OverlayScrollbarsComponent>
        </TableContainer>
      </Paper>
    </Box>
  );
};
