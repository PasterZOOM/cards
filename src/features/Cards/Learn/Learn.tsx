import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography/Typography';
import { useSearchParams } from 'react-router-dom';

import { Grades } from './Grades/Grades';

import { CardType } from 'api/cardsRequestTypes';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getActualPackParams } from 'common/utils/getActualParams';
import { getLocalStorage } from 'common/utils/localStorageUtil';
import styles from 'features/Cards/Learn/Learn.module.scss';
import { LearnPaper } from 'features/Cards/Learn/LearnPaper/LearnPaper';
import { loadPack, updatedGrade } from 'features/Cards/Pack/packReducer';
import { getCards } from 'features/Cards/Pack/packSelectors';

const maxGradeValue = 6;

const getCard = (cards: Array<CardType>): CardType => {
  const sum = cards.reduce(
    (acc, card) => acc + (maxGradeValue - card.grade) * (maxGradeValue - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum =
        acc.sum + (maxGradeValue - card.grade) * (maxGradeValue - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const Learn = (): ReturnComponentType => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const cards = useAppSelector(getCards);
  const [searchParams, setSearchParams] = useSearchParams();
  const packName = getLocalStorage('packName') as string;
  const [grade, setGrade] = useState(1);

  const [card, setCard] = useState<CardType>({
    _id: '',
    cardsPack_id: '',
    user_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    questionImg: '',
    answerImg: '',
    answerVideo: '',
    questionVideo: '',
    comments: '',
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (first) {
      dispatch(loadPack(getActualPackParams(searchParams)));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));

    return () => {
      setSearchParams({});
    };
  }, [dispatch, cards, first, searchParams, setSearchParams]);

  const onShowAnswer = (): void => setIsChecked(true);

  const onNext = (): void => {
    dispatch(updatedGrade({ grade, card_id: card._id }));
    setIsChecked(false);

    if (cards.length > 0) {
      setCard(getCard(cards));
    }
  };

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
              <b>Answer:</b> {card.answer}
            </Typography>
            <Grades setGrade={setGrade} />
          </div>
        </LearnPaper>
      )}
    </div>
  );
};
