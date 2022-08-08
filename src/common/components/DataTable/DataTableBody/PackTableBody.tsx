import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink, useNavigate } from 'react-router-dom';

import { PackType } from 'api/cardsRequestTypes';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setLocalStorage } from 'common/utils/localStorageUtil';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const updateDate = new Date(pack.updated).toLocaleDateString('ru');
  const navigate = useNavigate();

  const saveTitle = (): void => {
    setLocalStorage('packName', pack.name);
  };

  const showCards = (): void => {
    saveTitle();
  };

  const onClickLearnHandle = (): void => {
    saveTitle();
    navigate(`${path.LEARN}?cardsPack_id=${pack._id}&pageCount=${pack.cardsCount}`);
  };

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <NavLink
          to={`${path.PACK}?cardsPack_id=${pack._id}`}
          className={s.nameLink}
          onClick={showCards}
        >
          {pack.name}
        </NavLink>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{updateDate}</TableCell>
      <TableCell align="right">{pack.user_name}</TableCell>
      <TableCell align="right">
        <Box component="img" src={deleteIco} alt="deleteIco" className={s.ico} />
        <Box component="img" src={editIco} alt="editIco" className={s.ico} />
        <IconButton className={s.ico} onClick={onClickLearnHandle}>
          <img src={teacherIco} alt="learn" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
