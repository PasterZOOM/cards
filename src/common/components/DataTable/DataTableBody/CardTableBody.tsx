import React from 'react';

import { Rating } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { CardType } from 'api/cardsAPI';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type CardTableBodyProps = {
  card: CardType;
};

export const CardTableBody: React.FC<CardTableBodyProps> = ({
  card,
}): ReturnComponentType => {
  const updateDate = new Date(card.updated).toLocaleDateString('ru');

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="right">{card.answer}</TableCell>
      <TableCell align="right">{updateDate}</TableCell>
      <TableCell align="right">
        <Rating />
      </TableCell>
    </TableRow>
  );
};
