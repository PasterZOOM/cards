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
import { openModal } from 'features/Modal/modalReducer';

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
        data: { _id, name: '', loadPacks: false },
      }),
    );
  };

  return (
    <TableRow hover>
      <TableCell>{card.question}</TableCell>
      <TableCell>{card.answer}</TableCell>
      <TableCell>{updateDate}</TableCell>
      <TableCell style={{ paddingBottom: '9px' }}>
        <Rating value={card.grade} readOnly />
      </TableCell>
      <TableCell align="right" style={!ownPack ? { display: 'none' } : {}}>
        <IconButton onClick={updateCardHandler}>
          <img src={editIco} alt="edit" />
        </IconButton>
        <IconButton onClick={deleteCardHandler}>
          <img src={deleteIco} alt="delete" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
