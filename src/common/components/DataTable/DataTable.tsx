import React, { MouseEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';

import deleteIco from 'assets/images/delete.svg';
import editIco from 'assets/images/edit.svg';
import teacherIco from 'assets/images/teacher.svg';
import s from 'common/components/DataTable/DataTable.module.css';
import { DataTableHead } from 'common/components/DataTable/DataTableHead';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setLocalStorage } from 'common/utils/localStorageUtil';
import {
  changeValueSortPacks,
  sortPacks,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { getCardPacks } from 'features/Cards/CardPacks/cardPacksSelectors';
import { changeCardPackId } from 'features/Cards/Pack/packParams/packParamsReducer';
import { changePackName } from 'features/Cards/Pack/packReducer';

export type PackDataType = {
  packTitle: string;
  cardsCount: number;
  updateDate: string;
  creatorName: string;
  actions: string;
};

export type Order = 'asc' | 'desc';

export const DataTable = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const cardPacks = useAppSelector(getCardPacks);

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof PackDataType>('updateDate');

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof PackDataType,
  ): void => {
    const isAsc = orderBy === property && order === 'asc';

    if (property === 'packTitle') {
      if (order === 'asc') {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_NAME }));
      } else {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_NAME }));
      }
    }

    if (property === 'cardsCount') {
      if (order === 'asc') {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_CARDS_COUNT }));
      } else {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_CARDS_COUNT }));
      }
    }

    if (property === 'updateDate') {
      if (order === 'asc') {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_UPDATE }));
      } else {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_UPDATE }));
      }
    }

    if (property === 'creatorName') {
      if (order === 'asc') {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.ASC_USER_NAME }));
      } else {
        dispatch(changeValueSortPacks({ sortPacks: sortPacks.DESC_USER_NAME }));
      }
    }

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 1080 }} aria-labelledby="tableTitle">
            <DataTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {cardPacks &&
                cardPacks.map(row => {
                  const updateDate = new Date(row.updated).toLocaleDateString('ru');

                  const showCards = (): void => {
                    setLocalStorage('cardsPackId', row._id);
                    dispatch(changeCardPackId({ cardsPackId: row._id }));
                    dispatch(changePackName({ cardPackName: row.name }));
                  };

                  return (
                    <TableRow hover key={row._id + row.user_id}>
                      <TableCell component="th" scope="row" padding="none">
                        <NavLink
                          to={path.CARD_PACK}
                          className={s.nameLink}
                          onClick={showCards}
                        >
                          {row.name}
                        </NavLink>
                      </TableCell>
                      <TableCell align="right">{row.cardsCount}</TableCell>
                      <TableCell align="right">{updateDate}</TableCell>
                      <TableCell align="right">{row.user_name}</TableCell>
                      <TableCell align="right">
                        <Box
                          component="img"
                          src={deleteIco}
                          alt="deleteIco"
                          className={s.ico}
                        />
                        <Box
                          component="img"
                          src={editIco}
                          alt="editIco"
                          className={s.ico}
                        />
                        <Box
                          component="img"
                          src={teacherIco}
                          alt="teacherIco"
                          className={s.ico}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
