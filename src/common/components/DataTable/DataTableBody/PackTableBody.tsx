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
import { setLocalStorage } from 'common/utils/localStorageUtil';
import { openModal } from 'common/utils/modalUtils';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { PackModalType } from 'features/Modal/modalReduscer';

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

  const saveTitle = (): void => {
    setLocalStorage('packName', name);
  };

  const showCards = (): void => {
    saveTitle();
  };

  const onClickLearnHandle = (): void => {
    saveTitle();
    navigate(`${path.LEARN}?cardsPack_id=${_id}&pageCount=${cardsCount}`);
  };

  const updatePackHandler = (): void => {
    openModal(
      {
        open: modal.UPDATE_PACK,
        title: 'Edit pack',
        packModal: {
          _id,
          name,
          private: pack.private,
        },
      },
      dispatch,
    );
  };
  const deletePackHandler = (): void => {
    openModal(
      {
        open: modal.DELETE_PACK,
        title: 'Delete Pack',
        packModal: { _id, name } as PackModalType,
      },
      dispatch,
    );
  };

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <NavLink
          to={`${path.PACK}?cardsPack_id=${_id}`}
          className={s.nameLink}
          onClick={showCards}
        >
          {name}
        </NavLink>
      </TableCell>
      <TableCell align="right">{cardsCount}</TableCell>
      <TableCell align="right">{updateDate}</TableCell>
      <TableCell align="right">{user_name}</TableCell>
      <TableCell align="right">
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
