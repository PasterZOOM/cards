import React, { useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink, useNavigate } from 'react-router-dom';

import { PackType } from 'api/cardsAPI';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { AddAndEditPackModal } from 'common/components/Modal/AddAndEditPackModal/AddAndEditPackModal';
import { ModalPackFormTypes } from 'common/components/Modal/AddAndEditPackModal/ModalPackForm/modalPackFormType';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setLocalStorage } from 'common/utils/localStorageUtil';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { getCardPacksParams } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsSelectors';
import { updatePack } from 'features/Cards/CardPacks/cardsPacksReducer';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const updateDate = new Date(pack.updated).toLocaleDateString('ru');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const packParams = useAppSelector(getCardPacksParams);
  const myId = useAppSelector(getUserId);

  const savePackName = (): void => {
    setLocalStorage('packName', pack.name);
  };

  const onClickLearnHandle = (): void => {
    navigate(`${path.LEARN}?cardsPack_id=${pack._id}`);
  };

  const updatePackHandler = (values: ModalPackFormTypes): void => {
    const update = {
      cardsPack: {
        _id: pack._id,
        name: values.namePack,
        private: values.privatePack,
      },
    };

    dispatch(updatePack({ update, load: packParams }));
  };

  return (
    <>
      <TableRow hover>
        <TableCell component="th" scope="row">
          <NavLink
            to={`${path.PACK}?cardsPack_id=${pack._id}`}
            className={s.nameLink}
            onClick={savePackName}
          >
            {pack.name}
          </NavLink>
        </TableCell>
        <TableCell align="right">{pack.cardsCount}</TableCell>
        <TableCell align="right">{updateDate}</TableCell>
        <TableCell align="right">{pack.user_name}</TableCell>
        <TableCell align="right">
          <Box component="img" src={deleteIco} alt="deleteIco" className={s.ico} />
          <IconButton
            className={s.ico}
            onClick={() => setOpen(true)}
            disabled={pack.user_id !== myId}
          >
            <img src={editIco} alt="edit" />
          </IconButton>
          <IconButton className={s.ico} onClick={onClickLearnHandle}>
            <img src={teacherIco} alt="learn" />
          </IconButton>
        </TableCell>
      </TableRow>
      <AddAndEditPackModal
        callBack={updatePackHandler}
        handleClose={() => setOpen(false)}
        open={open}
        title="Edit pack"
        editableName={pack.name}
      />
    </>
  );
};
