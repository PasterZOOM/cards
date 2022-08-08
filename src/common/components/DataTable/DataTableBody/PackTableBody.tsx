import React from 'react';

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
import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { saveTitle } from 'common/utils/localStorageUtil';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const userId = useAppSelector(getUserId);
  const updateDate = new Date(pack.updated).toLocaleDateString('ru');
  const navigate = useNavigate();

  const showCards = (): void => {
    saveTitle(pack.name);
  };

  const onClickLearnHandle = (): void => {
    saveTitle(pack.name);
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
        {pack.user_id === userId && (
          <div>
            <IconButton className={s.ico}>
              <img src={deleteIco} alt="delete" />
            </IconButton>
            <IconButton className={s.ico}>
              <img src={editIco} alt="edit" />
            </IconButton>
          </div>
        )}
        {pack.cardsCount !== 0 && (
          <IconButton className={s.ico} onClick={onClickLearnHandle}>
            <img src={teacherIco} alt="learn" />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};
