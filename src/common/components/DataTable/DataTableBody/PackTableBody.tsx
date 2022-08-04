import React from 'react';

import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';

import { PackType } from 'api/cardsAPI';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { path } from 'common/enums/path';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setLocalStorage } from 'common/utils/localStorageUtil';
import { changeCardPackId } from 'features/Cards/Pack/packParams/packParamsReducer';
import { changePackName } from 'features/Cards/Pack/packReducer';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const updateDate = new Date(pack.updated).toLocaleDateString('ru');

  const showCards = (): void => {
    setLocalStorage('cardsPackId', pack._id);
    setLocalStorage('cardsPackName', pack.name);
    dispatch(changeCardPackId({ cardsPackId: pack._id }));
    dispatch(changePackName({ cardPackName: pack.name }));
  };

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <NavLink to={path.CARD_PACK} className={s.nameLink} onClick={showCards}>
          {pack.name}
        </NavLink>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{updateDate}</TableCell>
      <TableCell align="right">{pack.user_name}</TableCell>
      <TableCell align="right">
        <Box component="img" src={deleteIco} alt="deleteIco" className={s.ico} />
        <Box component="img" src={editIco} alt="editIco" className={s.ico} />
        <Box component="img" src={teacherIco} alt="teacherIco" className={s.ico} />
      </TableCell>
    </TableRow>
  );
};
