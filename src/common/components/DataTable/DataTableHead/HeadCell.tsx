import React, { MouseEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import {
  DataKeys,
  Order,
  HeadCellType,
} from 'common/components/DataTable/DataTableTypes';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type HeadCellProps = {
  headCell: HeadCellType;
  order: Order;
  orderBy: string;
  sortCallback: (property: DataKeys) => (event: MouseEvent<unknown>) => void;
};

export const HeadCell: React.FC<HeadCellProps> = ({
  headCell,
  order,
  orderBy,
  sortCallback,
}): ReturnComponentType => {
  return (
    <TableCell
      key={headCell.id}
      align={headCell.numeric ? 'right' : 'left'}
      sortDirection={orderBy === headCell.id ? order : false}
      width="20%"
    >
      {headCell.isSortable ? (
        <TableSortLabel
          direction={orderBy === headCell.id ? order : 'asc'}
          onClick={sortCallback(headCell.id)}
        >
          {headCell.label}
        </TableSortLabel>
      ) : (
        <span>{headCell.label}</span>
      )}
    </TableCell>
  );
};
