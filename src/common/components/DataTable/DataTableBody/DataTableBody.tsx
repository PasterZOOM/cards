import React from 'react';

import TableBody from '@mui/material/TableBody';

import { CardTableBody } from 'common/components/DataTable/DataTableBody/CardTableBody';
import { PackTableBody } from 'common/components/DataTable/DataTableBody/PackTableBody';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getCards } from 'features/Cards/Cards/cardsSelectors';
import { getCardPacks } from 'features/Cards/Packs/packsSelectors';

type DataTableBodyProps = {
  tableType: 'packs' | 'cards';
};

export const DataTableBody: React.FC<DataTableBodyProps> = ({
  tableType,
}): ReturnComponentType => {
  const cardPacks = useAppSelector(getCardPacks);
  const cards = useAppSelector(getCards);

  return (
    <TableBody>
      {tableType === 'packs'
        ? cardPacks.map(pack => (
            <PackTableBody key={pack._id + pack.user_id} pack={pack} />
          ))
        : cards.map(card => <CardTableBody key={card._id + card.user_id} card={card} />)}
    </TableBody>
  );
};
