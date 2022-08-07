import React, { useCallback, useEffect } from 'react';

import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import del from 'assets/images/delete.svg';
import edit from 'assets/images/edit.svg';
import ellipsis from 'assets/images/ellipsis.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { DataTable } from 'common/components/DataTable/DataTable';
import { EmptyTable } from 'common/components/EmptyTable/EmptyTable';
import { OptionMenu } from 'common/components/OptionMenu/OptionMenu';
import { Paginator } from 'common/components/Paginator/Paginator';
import { Search } from 'common/components/Search/Search';
import { startPageCount } from 'common/constants/projectConstants';
import { path } from 'common/enums/path';
import { sortCards } from 'common/enums/sortCards';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getLocalStorage } from 'common/utils/localStorageUtil';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { TopPart } from 'features/Cards/common/components/TopPart';
import styles from 'features/Cards/Pack/Pack.module.scss';
import { loadPack } from 'features/Cards/Pack/packReducer';
import {
  getCards,
  getCardsTotalCount,
  getPackUserId,
} from 'features/Cards/Pack/packSelectors';

const addCardButtonTitle = 'Add new card';

export const Pack = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const packName = getLocalStorage('packName') as string;
  const ownPack = useAppSelector(getUserId) === useAppSelector(getPackUserId);
  const cards = useAppSelector(getCards);
  const cardsTotalCount = useAppSelector(getCardsTotalCount);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const addNewCardHandler = useCallback((): void => {
    alert('create new card');
  }, []);

  useEffect(() => {
    if (searchParams.get('cardsPack_id')) {
      dispatch(
        loadPack({
          cardsPack_id: String(searchParams.get('cardsPack_id')) || undefined,
          page: Number(searchParams.get('page')) || undefined,
          sortCards: (searchParams.get('sortCards') as sortCards) || undefined,
          min: Number(searchParams.get('min')) || undefined,
          max: Number(searchParams.get('max')) || undefined,
          pageCount: Number(searchParams.get('pageCount')) || startPageCount,
          cardAnswer: searchParams.get('cardAnswer') || undefined,
        }),
      );
    } else navigate(path.CARD_PACKS);
  }, [dispatch, navigate, searchParams]);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <TopPart
        buttonTitle={addCardButtonTitle}
        headTitle={packName}
        items={cards.length !== 0}
        onClickButton={addNewCardHandler}
        ownPack={ownPack}
      >
        {[
          <BackToCardPacks key={0} />,
          <OptionMenu menuItems={menuItems} key={1}>
            <img src={ellipsis} alt="avatar" />
          </OptionMenu>,
        ]}
      </TopPart>
      <div />
      {cards.length !== 0 ? (
        <div>
          <div className={styles.search}>
            <Search search="cardAnswer" />
          </div>
          <DataTable tableType="cards" />
          <Paginator cardPacksTotalCount={cardsTotalCount} />
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
