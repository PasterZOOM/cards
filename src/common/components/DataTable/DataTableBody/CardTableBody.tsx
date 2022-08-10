import React from 'react';

import { Rating } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { CardType } from 'api/ResponseTypes';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import { modal } from 'common/enums/modal';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { getCardsPackUserId } from 'features/Cards/Cards/cardsSelectors';
import { openModal } from 'features/Modal/modalReduscer';

type CardTableBodyProps = {
  card: CardType;
};

export const CardTableBody: React.FC<CardTableBodyProps> = ({
  card,
}): ReturnComponentType => {
  const { updated, question, answer, _id } = card;
  const updateDate = new Date(updated).toLocaleDateString('ru');
  const dispatch = useAppDispatch();
  const ownPack = useAppSelector(getUserId) === useAppSelector(getCardsPackUserId);

  const updateCardHandler = (): void => {
    dispatch(
      openModal({
        title: modal.EDIT_CARD,
        data: { _id, question, answer },
      }),
    );
  };

  const deleteCardHandler = (): void => {
    dispatch(
      openModal({
        title: modal.DELETE_CARD,
        data: { _id, name: '' },
      }),
    );
  };

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {card.question}
      </TableCell>
      <TableCell align="right">{card.answer}</TableCell>
      <TableCell align="right">{updateDate}</TableCell>
      <TableCell align="right">
        <Rating value={card.grade} readOnly />
        {ownPack && (
          <div style={{ display: 'contents' }}>
            <IconButton onClick={updateCardHandler}>
              <img src={editIco} alt="edit" />
            </IconButton>
            <IconButton onClick={deleteCardHandler}>
              <img src={deleteIco} alt="delete" />
            </IconButton>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
