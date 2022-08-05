import React, { useEffect, useState } from 'react';

import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';

import styles from './NumberOfCards.module.scss';

import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  changeValueMaxCardsCount,
  changeValueMinCardsCount,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import { NumberOfCardsInput } from 'features/Cards/CardPacks/CardPacksParams/NumberOfCards/NumberOfCardsInput/NumberOfCardsInput';
import {
  getMaxCardsCount,
  getMinCardsCount,
} from 'features/Cards/CardPacks/cardPacksSelectors';

export const NumberOfCards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const minCardsCount = useAppSelector(getMinCardsCount);
  const maxCardsCount = useAppSelector(getMaxCardsCount);

  const [value, setValue] = useState<Array<number>>([minCardsCount, maxCardsCount]);
  const debouncedValue = useDebounce<Array<number>>(value);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    if (Array.isArray(newValue)) setValue(newValue);
  };

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount]);
  }, [maxCardsCount, minCardsCount]);

  useEffect(() => {
    dispatch(
      changeValueMinCardsCount({
        min: debouncedValue[0] !== minCardsCount ? debouncedValue[0] : undefined,
      }),
    );
    dispatch(
      changeValueMaxCardsCount({
        max: debouncedValue[1] !== maxCardsCount ? debouncedValue[1] : undefined,
      }),
    );
  }, [dispatch, debouncedValue]);

  return (
    <div className={styles.main}>
      <Typography className={styles.title}>Number of cards</Typography>
      <div className={styles.params}>
        <NumberOfCardsInput activeThumb={0} value={value} setValue={setValue} />

        <Slider
          className={styles.slider}
          value={value}
          onChange={handleChange}
          disableSwap
          min={minCardsCount}
          max={maxCardsCount}
        />

        <NumberOfCardsInput activeThumb={1} value={value} setValue={setValue} />
      </div>
    </div>
  );
};
