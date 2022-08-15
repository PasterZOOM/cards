import React, { MouseEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import {
  DataKeys,
  HeadCellType,
  Order,
} from 'common/components/DataTable/DataTableTypes';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { getCardsPackUserId } from 'features/Cards/Cards/cardsSelectors';

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
  const ownPack = useAppSelector(getUserId) === useAppSelector(getCardsPackUserId);

  return (
    <TableCell
      key={headCell.id}
      sortDirection={orderBy === headCell.id ? order : false}
      width={headCell.width}
      style={!ownPack && headCell.isOwner ? { display: 'none' } : {}}
      padding={headCell.label === 'Name' ? 'none' : 'normal'}
    >
      {headCell.isSortable ? (
        <TableSortLabel
          active={orderBy === headCell.id}
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
