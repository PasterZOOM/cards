import React, { useEffect } from 'react';

import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { Navigate, NavLink } from 'react-router-dom';

import back from 'assets/images/Back.svg';
import { EmptyTable } from 'common/components/EmptyTable/EmptyTable';
import { Paginator } from 'common/components/Paginator/Paginator';
import { Search } from 'common/components/Search/Search';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import style from 'features/Cards/Pack/Pack.module.scss';
import { changeCardQuestionSearchValue } from 'features/Cards/Pack/packParams/packParamsReducer';
import { getPackParams } from 'features/Cards/Pack/packParams/packParamsSelectors';
import { loadPack } from 'features/Cards/Pack/packReducer';
import { getPackName, getPackUserId, getCards } from 'features/Cards/Pack/packSelectors';

export const Pack = (): ReturnComponentType => {
  const addCardButtonTitle = 'Add new card';

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const params = useAppSelector(getPackParams);
  const packName = useAppSelector(getPackName);
  const ownPack = useAppSelector(getUserId) === useAppSelector(getPackUserId);
  const cards = useAppSelector(getCards);

  const fetchNewSearch = (value: string): void => {
    dispatch(changeCardQuestionSearchValue({ cardQuestion: value || undefined }));
  };

  const addNewCardHandler = (): void => {
    alert('create new card');
  };

  useEffect(() => {
    dispatch(loadPack(params));
  }, [dispatch, params]);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={style.main}>
      <NavLink to={path.CARD_PACKS} className={style.link}>
        <img src={back} alt="back" className={style.icon} />
        <Typography className={style.title}>Back to Packs List</Typography>
      </NavLink>
      <div className={style.head}>
        <Typography className={style.title}>{packName}</Typography>
        {ownPack && cards.length !== 0 && (
          <Button
            className={style.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={addNewCardHandler}
          >
            {addCardButtonTitle}
          </Button>
        )}
      </div>
      <div />
      {cards.length !== 0 ? (
        <div>
          <Search callBack={fetchNewSearch} />
          table
          <Paginator />
        </div>
      ) : (
        <div>
          <EmptyTable
            buttonTitle={addCardButtonTitle}
            callBack={addNewCardHandler}
            text="This pack is empty. Click add new card to fill this pack"
          />
        </div>
      )}
    </div>
  );
};
