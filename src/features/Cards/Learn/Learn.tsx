import React, { useState } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { Navigate } from 'react-router-dom';

import { Grades } from './Grades/Grades';

import { CardType } from 'api/ResponseTypes';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { useBack } from 'common/hooks/useBack';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getCard } from 'common/utils/getCard';
import { updatedGrade } from 'features/Cards/Cards/cardsReducer';
import { getCards, getPackName } from 'features/Cards/Cards/cardsSelectors';
import styles from 'features/Cards/Learn/Learn.module.scss';
import { LearnPaper } from 'features/Cards/Learn/LearnPaper/LearnPaper';

export const Learn = (): ReturnComponentType => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [grade, setGrade] = useState(1);
  const packName = useAppSelector(getPackName);
  const cards = useAppSelector(getCards);
  const back = useBack();

  const [card, setCard] = useState<CardType>(getCard(cards));

  const dispatch = useAppDispatch();

  const onShowAnswer = (): void => setIsChecked(true);

  const onNext = (): void => {
    dispatch(updatedGrade({ grade, card_id: card._id }));
    setIsChecked(false);
    setCard(getCard(cards));
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
              <b>Answer: </b>
              {card.answerImg ? (
                <div>
                  <img src={card.answerImg} alt="question" className={styles.answerImg} />
                </div>
              ) : (
                card.answer
              )}
            </Typography>
            <Grades setGrade={setGrade} />
          </div>
        </LearnPaper>
      )}
    </div>
  );
};
