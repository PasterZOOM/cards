import React, { useEffect, useMemo } from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Cards.module.scss';
import { setCardsParams } from './CardsParams/cardsParamsReducer';

import del from 'assets/images/delete.svg';
import edit from 'assets/images/edit.svg';
import ellipsis from 'assets/images/ellipsis.svg';
import teach from 'assets/images/teacher.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { GeneralButton } from 'common/components/Buttons/GeneralButton/GeneralButton';
import { DataTable } from 'common/components/DataTable/DataTable';
import { OptionMenu } from 'common/components/OptionMenu/OptionMenu';
import { Paginator } from 'common/components/Paginator/Paginator';
import { Search } from 'common/components/Search/Search';
import { modal } from 'common/enums/modal';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualCardsParams } from 'common/utils/getActualParams';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { loadCards } from 'features/Cards/Cards/cardsReducer';
import {
  getCards,
  getCardsPackUserId,
  getCardsTotalCount,
  getPackDeckCover,
  getPackName,
  getPackPrivate,
} from 'features/Cards/Cards/cardsSelectors';
import { setLearnParams } from 'features/Cards/Learn/learnReducer';
import { openModal } from 'features/Modal/modalReducer';

const addCardButtonTitle = 'Add new card';

export const Cards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const ownPack = useAppSelector(getUserId) === useAppSelector(getCardsPackUserId);
  const cards = useAppSelector(getCards);
  const cardsTotalCount = useAppSelector(getCardsTotalCount);
  const packName = useAppSelector(getPackName);
  const packPrivate = useAppSelector(getPackPrivate);
  const packDeckCover = useAppSelector(getPackDeckCover);
  const cardsPack_id = searchParams.get('cardsPack_id') as string;

  const menuItems = [
    {
      title: 'Edit',
      icon: edit,
      action: (): void => {
        dispatch(
          openModal({
            title: modal.EDIT_PACK,
            data: {
              _id: cardsPack_id,
              name: packName,
              private: packPrivate,
              loadPacks: false,
            },
          }),
        );
      },
    },
    {
      title: 'Delete',
      icon: del,
      action: (): void => {
        dispatch(
          openModal({
            title: modal.DELETE_PACK,
            data: { _id: cardsPack_id, name: packName, loadPacks: false },
          }),
        );
      },
    },
  ];

  const onClickLearnHandle = (): void => {
    navigate(path.LEARN);
    dispatch(setLearnParams({ cardsPack_id, pageCount: cardsTotalCount }));
  };

  const createNewCard = (): void => {
    dispatch(
      openModal({
        title: modal.ADD_CARD,
        data: {
          cardsPack_id,
          question: '',
          answer: '',
        },
      }),
    );
  };

  const params = useMemo(() => getActualCardsParams(searchParams), [searchParams]);

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    dispatch(setCardsParams(params));
  }, [dispatch, params]);

  // читает URL и делает запрос за картами
  useEffect(() => {
    dispatch(loadCards(params));
  }, [dispatch, params]);

  if (!isLoggedIn) {
    return <Navigate to={path.LOGIN} />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.backButton}>
        <BackToCardPacks />
      </div>
      <div className={styles.head}>
        <div className={styles.title}>
          <Typography className={styles.packName}>{packName}</Typography>
          {(cards.length !== 0 || (cards.length === 0 && params.cardQuestion)) && (
            <IconButton onClick={onClickLearnHandle} className={styles.learnIcon}>
              <img src={teach} alt="learn" />
            </IconButton>
          )}
          {ownPack && (
            <OptionMenu menuItems={menuItems}>
              <img src={ellipsis} alt="menu" />
            </OptionMenu>
          )}
        </div>
        {((cards.length !== 0 && ownPack) ||
          (cards.length === 0 && params.cardQuestion && ownPack)) && (
          <div>
            <GeneralButton label={addCardButtonTitle} onClick={createNewCard} />
          </div>
        )}
      </div>

      {packDeckCover && (
        <img
          src={packDeckCover}
          style={{ width: '100px' }}
          alt="ava"
          className={styles.cover}
        />
      )}

      {(cards.length !== 0 || (cards.length === 0 && params.cardQuestion)) && (
        <div className={styles.search}>
          <Search search="cardQuestion" />
        </div>
      )}

      {cards.length === 0 && params.cardQuestion && (
        <div className={styles.body}>
          <Typography className={styles.text}>Nothing found for your request.</Typography>
        </div>
      )}

      {cards.length !== 0 && (
        <div className={styles.body}>
          <DataTable tableType="cards" />
          <Paginator cardPacksTotalCount={cardsTotalCount} />
        </div>
      )}

      {cards.length === 0 && ownPack && !params.cardQuestion && (
        <div className={styles.body}>
          <Typography className={styles.text}>
            This cards is empty. Click add new card to fill this cards
          </Typography>
          <GeneralButton label={addCardButtonTitle} onClick={createNewCard} />
        </div>
      )}

      {cards.length === 0 && !ownPack && !params.cardQuestion && (
        <div className={styles.body}>
          <Typography className={styles.text}>This cards is empty.</Typography>
        </div>
      )}
    </div>
  );
};
