import React, { useCallback, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import del from 'assets/images/delete.svg';
import edit from 'assets/images/edit.svg';
import ellipsis from 'assets/images/ellipsis.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { DataTable } from 'common/components/DataTable/DataTable';
import { EmptyTable } from 'common/components/EmptyTable/EmptyTable';
import { AddAndEditCardModal } from 'common/components/Modal/AddAndEditCardModal/AddAndEditCardModal';
import { ModalCardFormTypes } from 'common/components/Modal/AddAndEditCardModal/ModalCardForm/modalCardFormType';
import { OptionMenu } from 'common/components/OptionMenu/OptionMenu';
import { Paginator } from 'common/components/Paginator/Paginator';
import { Search } from 'common/components/Search/Search';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualPackParams } from 'common/utils/getActualParams';
import { getLocalStorage } from 'common/utils/localStorageUtil';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { TopPart } from 'features/Cards/common/components/TopPart';
import styles from 'features/Cards/Pack/Pack.module.scss';
import { setPacksParams } from 'features/Cards/Pack/PackParams/packParamsReducer';
import { getPackParams } from 'features/Cards/Pack/PackParams/packParamsSelectors';
import { createCard, loadPack } from 'features/Cards/Pack/packReducer';
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
  const params = useAppSelector(getPackParams);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const addNewCardHandler = useCallback((): void => {
    handleOpen();
  }, []);

  const createNewCard = (values: ModalCardFormTypes): void => {
    const create = {
      card: {
        cardsPack_id: params.cardsPack_id,
        question: values.question,
        answer: values.answer,
      },
    };

    dispatch(
      createCard({
        create,
        load: params,
      }),
    );
  };

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

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    dispatch(
      setPacksParams({
        params: getActualPackParams(searchParams),
      }),
    );
  }, [dispatch, searchParams]);

  // читает URL и делает запрос за картами
  useEffect(() => {
    if (searchParams.get('cardsPack_id')) {
      dispatch(loadPack(getActualPackParams(searchParams)));
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
        items={cards.length !== 0 || (cards.length === 0 && !!params.cardQuestion)}
        onClickButton={addNewCardHandler}
        ownPack={ownPack}
      >
        {[
          <BackToCardPacks key={0} />,
          <OptionMenu menuItems={menuItems} key={1}>
            <img src={ellipsis} alt="menu" />
          </OptionMenu>,
        ]}
      </TopPart>
      <div />
      {cards.length === 0 && !params.cardQuestion ? (
        <div>
          <EmptyTable
            buttonTitle={addCardButtonTitle}
            callBack={addNewCardHandler}
            text="This pack is empty. Click add new card to fill this pack"
          />
        </div>
      ) : (
        <div>
          <div className={styles.search}>
            <Search search="cardQuestion" />
          </div>
          {cards.length !== 0 ? (
            <div>
              <DataTable tableType="cards" />
              <Paginator cardPacksTotalCount={cardsTotalCount} />
            </div>
          ) : (
            <Typography className={styles.title}>
              Nothing found for your request
            </Typography>
          )}
        </div>
      )}
      <AddAndEditCardModal
        callBack={createNewCard}
        handleClose={handleClose}
        open={open}
        title="Add new card"
      />
    </div>
  );
};
