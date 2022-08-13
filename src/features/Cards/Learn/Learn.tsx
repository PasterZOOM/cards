import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import { Grades } from './Grades/Grades';

import { CardType } from 'api/ResponseTypes';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { useBack } from 'common/hooks/useBack';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getCard } from 'common/utils/getCard';
import { loadCards, updatedGrade } from 'features/Cards/Cards/cardsReducer';
import { getCards, getPackName } from 'features/Cards/Cards/cardsSelectors';
import styles from 'features/Cards/Learn/Learn.module.scss';
import { LearnPaper } from 'features/Cards/Learn/LearnPaper/LearnPaper';
import { getLearnParams } from 'features/Cards/Learn/learnSelectors';

export const Learn = (): ReturnComponentType => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const [grade, setGrade] = useState(1);
  const packName = useAppSelector(getPackName);
  const cards = useAppSelector(getCards);
  const params = useAppSelector(getLearnParams);
  const back = useBack();

  const [card, setCard] = useState<CardType>({} as CardType);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (first && cards.length > 0) {
      dispatch(loadCards(params));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));
  }, [dispatch, cards, first, params]);

  const onShowAnswer = (): void => setIsChecked(true);

  const onNext = (): void => {
    dispatch(updatedGrade({ grade, card_id: card._id }));
    setIsChecked(false);

    if (cards.length > 0) {
      setCard(getCard(cards));
    }
  };

  if (cards.length === 0) return <Navigate to={back} />;

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <BackToCardPacks />
      </div>
      <Typography className={styles.title}>Learn {`"${packName}"`}</Typography>
      {!isChecked ? (
        <LearnPaper card={card} onClick={onShowAnswer} buttonLabel="Show answer" />
      ) : (
        <LearnPaper card={card} onClick={onNext} buttonLabel="Next">
          <div>
            <Typography className={styles.answer}>
              <b>Answer:</b> {card.answer !== 'no answer' && card.answer}
              {card.answerImg && <div>{card.answerImg}</div>}
            </Typography>
            <Grades setGrade={setGrade} />
          </div>
        </LearnPaper>
      )}
    </div>
  );
};
