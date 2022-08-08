import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink, useNavigate } from 'react-router-dom';

import { PackType } from 'api/cardsRequestTypes';
import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { AddAndEditPackModal } from 'common/components/Modal/AddAndEditPackModal/AddAndEditPackModal';
import { ModalPackFormTypes } from 'common/components/Modal/AddAndEditPackModal/ModalPackForm/modalPackFormType';
import { DeletePackModal } from 'common/components/Modal/DeletePackModal/DeletePackModal';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setLocalStorage } from 'common/utils/localStorageUtil';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { updatePack } from 'features/Cards/CardPacks/cardsPacksReducer';

type PacksTableBodyProps = {
  pack: PackType;
};

export const PackTableBody: React.FC<PacksTableBodyProps> = ({
  pack,
}): ReturnComponentType => {
  const updateDate = new Date(pack.updated).toLocaleDateString('ru');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const myId = useAppSelector(getUserId);

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
  const updatePackHandler = (values: ModalPackFormTypes): void => {
    const update = {
      cardsPack: {
        _id: pack._id,
        name: values.namePack,
        private: values.privatePack,
      },
    };

    dispatch(updatePack(update));
  };

  return (
    <>
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
          <IconButton
            className={`${s.ico} + ${s.disable}`}
            onClick={onClickLearnHandle}
            disabled={pack.cardsCount === 0}
          >
            <img src={teacherIco} alt="learn" />
          </IconButton>
          <IconButton
            className={`${s.ico} + ${s.invisible}`}
            onClick={() => setOpen(true)}
            disabled={pack.user_id !== myId}
          >
            <img src={editIco} alt="edit" />
          </IconButton>
          <IconButton
            className={`${s.ico} + ${s.invisible}`}
            onClick={() => setOpenDeleteModal(true)}
            disabled={pack.user_id !== myId}
          >
            <img src={deleteIco} alt="delete" />
          </IconButton>
        </TableCell>
      </TableRow>
      <AddAndEditPackModal
        callBack={updatePackHandler}
        handleClose={() => setOpen(false)}
        open={open}
        title="Edit pack"
        editableName={pack.name}
        editablePrivateStatus={pack.private}
      />
      <DeletePackModal
        packId={pack._id}
        handleClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        title="Delete pack"
        packName={pack.name}
      />
    </>
  );
};
