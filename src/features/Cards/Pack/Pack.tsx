import React, { useCallback, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { PackType } from 'api/cardsRequestTypes';
import del from 'assets/images/delete.svg';
import edit from 'assets/images/edit.svg';
import ellipsis from 'assets/images/ellipsis.svg';
import teach from 'assets/images/teacher.svg';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { DataTable } from 'common/components/DataTable/DataTable';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { AddAndEditCardModal } from 'common/components/Modal/AddAndEditCardModal/AddAndEditCardModal';
import { ModalCardFormTypes } from 'common/components/Modal/AddAndEditCardModal/ModalCardForm/modalCardFormType';
import { AddAndEditPackModal } from 'common/components/Modal/AddAndEditPackModal/AddAndEditPackModal';
import { ModalPackFormTypes } from 'common/components/Modal/AddAndEditPackModal/ModalPackForm/modalPackFormType';
import { DeletePackModal } from 'common/components/Modal/DeletePackModal/DeletePackModal';
import { OptionMenu } from 'common/components/OptionMenu/OptionMenu';
import { Paginator } from 'common/components/Paginator/Paginator';
import { Search } from 'common/components/Search/Search';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualPackParams } from 'common/utils/getActualParams';
import { getLocalStorage, saveTitle } from 'common/utils/localStorageUtil';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import { getUserId } from 'features/Auth/User/Profile/profileSelectors';
import { getCardPacks } from 'features/Cards/CardPacks/cardPacksSelectors';
import { updatePack } from 'features/Cards/CardPacks/cardsPacksReducer';
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
  const packs = useAppSelector(getCardPacks);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState<null | 'addCard' | 'editPack' | 'deletePack'>(null);

  const menuItems = [
    {
      title: 'Edit',
      icon: edit,
      action: (): void => {
        setOpen('editPack');
      },
    },
    {
      title: 'Delete',
      icon: del,
      action: (): void => {
        setOpen('deletePack');
      },
    },
  ];
  const addNewCardHandler = useCallback((): void => {
    setOpen('addCard');
  }, []);
  const handleClose = (): void => setOpen(null);

  const pack = packs.find(
    pack => pack._id === searchParams.get('cardsPack_id'),
  ) as PackType;

  const createNewCard = (values: ModalCardFormTypes): void => {
    dispatch(
      createCard({
        cardsPack_id: params.cardsPack_id,
        question: values.question,
        answer: values.answer,
      }),
    );
  };
  const updatePackHandler = (values: ModalPackFormTypes): void => {
    saveTitle(values.namePack);
    dispatch(
      updatePack({
        _id: pack._id,
        name: values.namePack,
        private: values.privatePack,
      }),
    );
  };

  const onClickLearnHandle = (): void => {
    saveTitle(pack.name);
    navigate(`${path.LEARN}?cardsPack_id=${pack._id}&pageCount=${pack.cardsCount}`);
  };

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
            <GeneralButton label={addCardButtonTitle} onClick={addNewCardHandler} />
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
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <GeneralButton label={addCardButtonTitle} onClick={addNewCardHandler} />
        </div>
      )}
      {cards.length === 0 && !ownPack && !params.cardQuestion && (
        <div className={styles.body}>
          <Typography className={styles.text}>This pack is empty.</Typography>
        </div>
      )}
      <AddAndEditCardModal
        callBack={createNewCard}
        handleClose={handleClose}
        open={open === 'addCard'}
        title="Add new card"
      />
      <AddAndEditPackModal
        callBack={updatePackHandler}
        handleClose={handleClose}
        open={open === 'editPack'}
        title="Edit pack"
        editableName={pack.name}
        editablePrivateStatus={pack.private}
      />
      <DeletePackModal
        packId={pack._id}
        handleClose={handleClose}
        open={open === 'deletePack'}
        title="Delete pack"
        packName={pack.name}
      />
    </div>
  );
};
