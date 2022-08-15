import React, { ReactElement } from 'react';

import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink, useNavigate } from 'react-router-dom';

import { PackType } from 'api/ResponseTypes';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.scss';
import { modal } from 'common/enums/modal';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { setLearnParams } from 'features/Cards/Learn/learnReducer';
import { openModal } from 'features/Modal/modalReducer';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const { _id, name, updated, user_name, cardsCount, user_id, deckCover } = { ...pack };
  const updateDate = new Date(updated).toLocaleDateString('ru');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myId = useAppSelector(getUserId);

  const onClickLearnHandle = (): void => {
    navigate(path.LEARN);
    dispatch(setLearnParams({ cardsPack_id: _id, pageCount: cardsCount }));
  };

  const updatePackHandler = (): void => {
    dispatch(
      openModal({
        title: modal.EDIT_PACK,
        data: { _id, name, private: pack.private, loadPacks: true },
      }),
    );
  };

  const deletePackHandler = (): void => {
    dispatch(
      openModal({
        title: modal.DELETE_PACK,
        data: { _id, name, loadPacks: true },
      }),
    );
  };

  const showDeckCoverImage = (): ReactElement | undefined => {
    const countOfSymbols = 11;

    if (deckCover) {
      if (deckCover.substring(0, countOfSymbols) === 'data:image/') {
        return (
          <Box sx={{ height: '36px' }} component="img" src={deckCover} alt="cover" />
        );
      }
    }
  };

  return (
    <TableRow hover>
      <TableCell>
        <Box component="span" className={s.deckCoverContainer}>
          {showDeckCoverImage()}
        </Box>
      </TableCell>
      <TableCell padding="none">
        <Box component="span" className={s.packNameColumn}>
          <NavLink to={`${path.CARDS}?cardsPack_id=${_id}`} className={s.nameLink}>
            {name}
          </NavLink>
        </Box>
      </TableCell>
      <TableCell>{cardsCount}</TableCell>
      <TableCell>{updateDate}</TableCell>
      <TableCell>
        <Box component="span" className={s.userNameColumn}>
          {user_name}
        </Box>
      </TableCell>
      <TableCell>
        <IconButton
          className={`${s.ico} + ${s.disable}`}
          onClick={onClickLearnHandle}
          disabled={cardsCount === 0}
        >
          <img src={teacherIco} alt="learn" />
        </IconButton>
        <IconButton
          className={`${s.ico} + ${s.invisible}`}
          disabled={user_id !== myId}
          onClick={updatePackHandler}
        >
          <img src={editIco} alt="edit" />
        </IconButton>
        <IconButton
          className={`${s.ico} + ${s.invisible}`}
          disabled={user_id !== myId}
          onClick={deletePackHandler}
        >
          <img src={deleteIco} alt="delete" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
