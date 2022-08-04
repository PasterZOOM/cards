import React, { useCallback, useEffect } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate, NavLink } from 'react-router-dom';

import back from 'assets/images/Back.svg';
import del from 'assets/images/delete.svg';
import edit from 'assets/images/edit.svg';
import ellipsis from 'assets/images/ellipsis.svg';
import { DataTable } from 'common/components/DataTable/DataTable';
import { EmptyTable } from 'common/components/EmptyTable/EmptyTable';
import { OptionMenu } from 'common/components/OptionMenu/OptionMenu';
import { Paginator } from 'common/components/Paginator/Paginator';
import { Search } from 'common/components/Search/Search';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getLocalStorage } from 'common/utils/localStorageUtil';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { TopPart } from 'features/Cards/common/components/TopPart';
import style from 'features/Cards/Pack/Pack.module.scss';
import { changeCardQuestionSearchValue } from 'features/Cards/Pack/packParams/packParamsReducer';
import { getPackParams } from 'features/Cards/Pack/packParams/packParamsSelectors';
import { changePackName, loadPack } from 'features/Cards/Pack/packReducer';
import { getCards, getPackName, getPackUserId } from 'features/Cards/Pack/packSelectors';

const addCardButtonTitle = 'Add new card';

export const Pack = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const params = useAppSelector(getPackParams);
  const packName = useAppSelector(getPackName);
  const ownPack = useAppSelector(getUserId) === useAppSelector(getPackUserId);
  const cards = useAppSelector(getCards);

  const menuItems = [
    {
      title: 'Edit',
      icon: edit,
      action: (): void => {
        alert('edit pack');
      },
    },
    {
      title: 'Delete',
      icon: del,
      action: (): void => {
        alert('pack deleted');
      },
    },
  ];

  const fetchNewSearch = useCallback(
    (value: string): void => {
      dispatch(changeCardQuestionSearchValue({ cardQuestion: value || undefined }));
    },
    [dispatch],
  );

  const addNewCardHandler = useCallback((): void => {
    alert('create new card');
  }, []);

  useEffect(() => {
    const cardsPackId = getLocalStorage('cardsPackId');
    const cardPackName = getLocalStorage('cardsPackName');

    dispatch(loadPack({ ...params, cardsPack_id: cardsPackId as string }));
    dispatch(changePackName({ cardPackName: cardPackName as string }));
  }, [dispatch, params]);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={style.main}>
      <TopPart
        buttonTitle={addCardButtonTitle}
        headTitle={packName}
        items={cards.length !== 0}
        onClickButton={addNewCardHandler}
        ownPack={ownPack}
      >
        {[
          <NavLink to={path.CARD_PACKS} className={style.link} key={0}>
            <img src={back} alt="back" className={style.icon} />
            <Typography className={style.title}>Back to Packs List</Typography>
          </NavLink>,
          <OptionMenu menuItems={menuItems} key={1}>
            <img src={ellipsis} alt="avatar" />
          </OptionMenu>,
        ]}
      </TopPart>
      <div />
      {cards.length !== 0 ? (
        <div>
          <Search callBack={fetchNewSearch} />
          <DataTable tableType="cards" />
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
