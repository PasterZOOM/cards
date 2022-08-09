import React, { useEffect } from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Cards.module.scss';
import { setCardsParams } from './CardsParams/cardsParamsReducer';

import { PackType } from 'api/ResponseTypes';
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
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualCardsParams } from 'common/utils/getActualParams';
import { getLocalStorage, saveTitle } from 'common/utils/localStorageUtil';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { getCardsParams } from 'features/Cards/Cards/CardsParams/cardsParamsSelectors';
import { loadCards } from 'features/Cards/Cards/cardsReducer';
import {
  getCards,
  getCardsPackUserId,
  getCardsTotalCount,
} from 'features/Cards/Cards/cardsSelectors';
import { getCardPacks } from 'features/Cards/Packs/packsSelectors';

const addCardButtonTitle = 'Add new card';

export const Cards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const packName = getLocalStorage('packName') as string;
  const ownPack = useAppSelector(getUserId) === useAppSelector(getCardsPackUserId);
  const cards = useAppSelector(getCards);
  const cardsTotalCount = useAppSelector(getCardsTotalCount);
  const params = useAppSelector(getCardsParams);
  const packs = useAppSelector(getCardPacks);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Edit',
      icon: edit,
      action: (): void => {},
    },
    {
      title: 'Delete',
      icon: del,
      action: (): void => {},
    },
  ];

  const pack = packs.find(
    pack => pack._id === searchParams.get('cardsPack_id'),
  ) as PackType;

  const onClickLearnHandle = (): void => {
    saveTitle(pack.name);
    navigate(`${path.LEARN}?cardsPack_id=${pack._id}&pageCount=${pack.cardsCount}`);
  };

  // читает URL и сохраняет params в стейт
  useEffect(() => {
    dispatch(
      setCardsParams({
        params: getActualCardsParams(searchParams),
      }),
    );
  }, [dispatch, searchParams]);

  // читает URL и делает запрос за картами
  useEffect(() => {
    if (searchParams.get('cardsPack_id')) {
      dispatch(loadCards(getActualCardsParams(searchParams)));
    } else navigate(path.CARD_PACKS);
  }, [dispatch, navigate, searchParams]);

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
            <GeneralButton label={addCardButtonTitle} onClick={() => {}} />
          </div>
        )}
      </div>

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
          <GeneralButton label={addCardButtonTitle} onClick={() => {}} />
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
