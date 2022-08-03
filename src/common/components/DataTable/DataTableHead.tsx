import React, { MouseEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { Order, PackDataType } from 'common/components/DataTable/DataTable';
import s from 'common/components/DataTable/DataTable.module.css';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type HeadCell = {
  disablePadding: boolean;
  id: keyof PackDataType;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: 'packTitle',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'cardsCount',
    numeric: true,
    disablePadding: false,
    label: 'Cards',
  },
  {
    id: 'updateDate',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'creatorName',
    numeric: true,
    disablePadding: false,
    label: 'Created by',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

type DataTableHeadProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof PackDataType) => void;
  order: Order;
  orderBy: string;
};

export const DataTableHead: React.FC<DataTableHeadProps> = ({
  order,
  orderBy,
  onRequestSort,
}): ReturnComponentType => {
  const createSortHandler =
    (property: keyof PackDataType) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'actions' ? (
              <TableSortLabel
                // active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <span>{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
