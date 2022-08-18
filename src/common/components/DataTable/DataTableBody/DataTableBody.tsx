import React from 'react';

import TableBody from '@mui/material/TableBody';

import { CardTableBody } from 'common/components/DataTable/DataTableBody/VariousTableBodies/CardTableBody';
import { PackTableBody } from 'common/components/DataTable/DataTableBody/VariousTableBodies/PackTableBody';
import { UserTableBody } from 'common/components/DataTable/DataTableBody/VariousTableBodies/UserTableBody';
import { TableType } from 'common/components/DataTable/DataTableTypes';
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getCards } from 'features/Cards/Cards/cardsSelectors';
import { getCardPacks } from 'features/Cards/Packs/packsSelectors';
import { getUsers } from 'features/Social/Users/usersSelectors';

type DataTableBodyProps = {
  tableType: TableType;
};

export const DataTableBody: React.FC<DataTableBodyProps> = ({
  tableType,
}): ReturnComponentType => {
  const cardPacks = useAppSelector(getCardPacks);
  const cards = useAppSelector(getCards);
  const users = useAppSelector(getUsers);

  return (
    <TableBody>
      {tableType === 'packs' &&
        cardPacks.map(pack => (
          <PackTableBody key={pack._id + pack.user_id} pack={pack} />
        ))}
      {tableType === 'cards' &&
        cards.map(card => <CardTableBody key={card._id + card.user_id} card={card} />)}
      {tableType === 'users' &&
        users.map(user => <UserTableBody key={user._id + user._id} user={user} />)}
    </TableBody>
  );
};
