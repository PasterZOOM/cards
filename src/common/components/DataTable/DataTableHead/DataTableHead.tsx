import React, { MouseEvent } from 'react';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import s from 'common/components/DataTable/DataTable.module.css';
import { HeadCell } from 'common/components/DataTable/DataTableHead/HeadCell';
import {
  headCellsCards,
  headCellsPacks,
} from 'common/components/DataTable/DataTableHead/HeadData';
import { DataKeys, Order } from 'common/components/DataTable/DataTableTypes';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DataTableHeadProps = {
  tableType: 'packs' | 'cards';
  onRequestSort: (event: MouseEvent<unknown>, property: DataKeys) => void;
  order: Order;
  orderBy: string;
};

export const DataTableHead: React.FC<DataTableHeadProps> = ({
  tableType,
  order,
  orderBy,
  onRequestSort,
}): ReturnComponentType => {
  const createSortHandler = (property: DataKeys) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {tableType === 'packs'
          ? headCellsPacks.map(headCell => (
              <HeadCell
                key={headCell.id}
                headCell={headCell}
                order={order}
                orderBy={orderBy}
                sortCallback={createSortHandler}
              />
            ))
          : headCellsCards.map(headCell => (
              <HeadCell
                key={headCell.id}
                headCell={headCell}
                order={order}
                orderBy={orderBy}
                sortCallback={createSortHandler}
              />
            ))}
      </TableRow>
    </TableHead>
  );
};
