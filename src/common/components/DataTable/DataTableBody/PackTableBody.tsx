import React from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink, useNavigate } from 'react-router-dom';

import { PackType } from 'api/ResponseTypes';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { modal } from 'common/enums/modal';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { setLearnParams } from 'features/Cards/Learn/learnReducer';
import { openModal } from 'features/Modal/modalReduscer';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const { _id, name, updated, user_name, cardsCount, user_id } = { ...pack };
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

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <NavLink to={`${path.CARDS}?cardsPack_id=${_id}`} className={s.nameLink}>
          {name}
        </NavLink>
      </TableCell>
      <TableCell align="left">{cardsCount}</TableCell>
      <TableCell align="left">{updateDate}</TableCell>
      <TableCell align="left">{user_name}</TableCell>
      <TableCell align="left">
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
