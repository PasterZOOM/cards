import React, { useCallback, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import del from 'assets/images/delete.svg';
import edit from 'assets/images/edit.svg';
import ellipsis from 'assets/images/ellipsis.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
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
import styles from 'features/Cards/Pack/Pack.module.scss';
import {
  changeCardQuestionSearchValue,
  changePageCards,
  changePageCountCards,
} from 'features/Cards/Pack/packParams/packParamsReducer';
import {
  getPackParams,
  getPageCount,
  getPagePackParams,
} from 'features/Cards/Pack/packParams/packParamsSelectors';
import { changePackName, loadPack } from 'features/Cards/Pack/packReducer';
import {
  getCards,
  getCardsTotalCount,
  getPackName,
  getPackUserId,
} from 'features/Cards/Pack/packSelectors';

const addCardButtonTitle = 'Add new card';

export const Pack = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const params = useAppSelector(getPackParams);
  const packName = useAppSelector(getPackName);
  const ownPack = useAppSelector(getUserId) === useAppSelector(getPackUserId);
  const cards = useAppSelector(getCards);
  const page = useAppSelector(getPagePackParams);
  const cardsTotalCount = useAppSelector(getCardsTotalCount);
  const pageCount = useAppSelector(getPageCount);
  const pageCountNumber = getLocalStorage('pageCount')
    ? parseInt(getLocalStorage('pageCount') as string, 10)
    : pageCount;

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
    dispatch(
      loadPack({
        ...params,
        cardsPack_id: getLocalStorage('cardsPackId') as string,
        pageCount: pageCountNumber,
      }),
    );
    dispatch(
      changePackName({ cardPackName: getLocalStorage('cardsPackName') as string }),
    );
  }, [dispatch, pageCountNumber, params]);

  const changePageHandler = (page: number): void => {
    dispatch(changePageCards({ page }));
  };

  const changePageCountHandler = (pageCount: number): void => {
    dispatch(changePageCountCards({ pageCount }));
  };

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
            <Search callBack={fetchNewSearch} />
          </div>
          <DataTable tableType="cards" />
          <Paginator
            paramsPage={page}
            cardPacksTotalCount={cardsTotalCount}
            pageCount={pageCount}
            changePage={changePageHandler}
            changePageCount={changePageCountHandler}
          />
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
