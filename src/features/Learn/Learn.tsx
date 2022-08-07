import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { useSearchParams } from 'react-router-dom';

import styles from './Learn.module.scss';

import { CardType } from 'api/cardsAPI';
import { BackToCardPacks } from 'common/components/BackToCardPacks/BackToCardPacks';
import { GeneralButton } from 'common/components/GeneralButton/GeneralButton';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { loadPack } from 'features/Cards/Pack/packReducer';
import { getCards } from 'features/Cards/Pack/packSelectors';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];
const magicNumber = 6;

const getCard = (cards: Array<CardType>): CardType => {
  const sum = cards.reduce(
    (acc, card) => acc + (magicNumber - card.grade) * (magicNumber - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (magicNumber - card.grade) * (magicNumber - card.grade);

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
  const [searchParams] = useSearchParams();

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
    console.log('LearnContainer useEffect');

    if (first) {
      dispatch(loadPack({ cardsPack_id: searchParams.get('cardsPack_id') as string }));
      setFirst(false);
    }

    console.log('cards', cards);
    if (cards.length > 0) setCard(getCard(cards));

    return () => {
      console.log('LearnContainer useEffect off');
    };
  }, [dispatch, cards, first]);

  const onNext = (): void => {
    setIsChecked(false);

    if (cards.length > 0) {
      // dispatch
      setCard(getCard(cards));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <BackToCardPacks />
      </div>
      <Typography className={styles.title}>Sing Up</Typography>
      <Paper elevation={3} className={styles.paper}>
        <GeneralButton label="Show answer" onClick={() => setIsChecked(true)} />
        <div>{card.question}</div>
        <div>
          <GeneralButton onClick={() => setIsChecked(true)} label="check" />
        </div>

        {isChecked && (
          <>
            <div>{card.answer}</div>

            {grades.map(g => (
              <GeneralButton key={`grade-${g}`} onClick={() => {}} label={g} />
            ))}

            <div>
              <GeneralButton onClick={onNext} label="next" />
            </div>
          </>
        )}
      </Paper>
    </div>
  );
};
