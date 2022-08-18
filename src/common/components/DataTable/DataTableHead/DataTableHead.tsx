import React, { MouseEvent, ReactElement } from 'react';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import s from 'common/components/DataTable/DataTable.module.scss';
import { HeadCell } from 'common/components/DataTable/DataTableHead/HeadCell';
import {
  headCellsCards,
  headCellsPacks,
  headCellsUsers,
} from 'common/components/DataTable/DataTableHead/HeadData';
import {
  DataKeys,
  HeadCellType,
  Order,
  TableType,
} from 'common/components/DataTable/DataTableTypes';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type DataTableHeadProps = {
  tableType: TableType;
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

  const renderCurrentHeadCell = (
    currentTable: TableType,
    currentHeadCells: readonly HeadCellType[],
  ): ReactElement[] | undefined => {
    if (tableType === currentTable) {
      return currentHeadCells.map(headCell => (
        <HeadCell
          key={headCell.id}
          headCell={headCell}
          order={order}
          orderBy={orderBy}
          sortCallback={createSortHandler}
        />
      ));
    }
  };

  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {renderCurrentHeadCell('packs', headCellsPacks) ||
          renderCurrentHeadCell('cards', headCellsCards) ||
          renderCurrentHeadCell('users', headCellsUsers)}
      </TableRow>
    </TableHead>
  );
};
