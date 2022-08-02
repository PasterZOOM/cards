import React, { ChangeEvent, useEffect, useState } from 'react';

import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';

import styles from './NumberOfCards.module.scss';

import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  changeValueMaxCardsCount,
  changeValueMinCardsCount,
} from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
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
  const changeMinValue = (event: ChangeEvent<HTMLInputElement>): void => {
    let value0 = event.currentTarget.valueAsNumber;

    if (value0 < minCardsCount) value0 = minCardsCount;
    if (value0 > maxCardsCount) value0 = maxCardsCount;

    setValue([!value0 ? 0 : Math.trunc(value0), value[1]]);
  };
  const changeMaxValue = (event: ChangeEvent<HTMLInputElement>): void => {
    let value1 = event.currentTarget.valueAsNumber;

    if (value1 < minCardsCount) value1 = minCardsCount;
    if (value1 > maxCardsCount) value1 = maxCardsCount;

    setValue([value[0], !value1 ? 0 : Math.trunc(value1)]);
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
        <input
          type="number"
          className={styles.input}
          value={value[0].toFixed()}
          min={minCardsCount}
          max={value[1]}
          onChange={changeMinValue}
        />

        <Slider
          className={styles.slider}
          value={value}
          onChange={handleChange}
          disableSwap
          min={minCardsCount}
          max={maxCardsCount}
        />

        <input
          type="number"
          className={styles.input}
          value={value[1].toFixed()}
          min={value[0]}
          max={maxCardsCount}
          onChange={changeMaxValue}
        />
      </div>
    </div>
  );
};
