import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';

import styles from './NumberOfCards.module.scss';

import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  changeValueMaxCardsCount,
  changeValueMinCardsCount,
} from 'features/Cards/Packs/Options/paksOptionsReducer';
import { getMaxCardsCount, getMinCardsCount } from 'features/Cards/Packs/packsSelectors';

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
    <Grid item className={styles.numberOfCardsContainer}>
      <Typography className={styles.title}>Number of cards</Typography>
      <Grid container direction="row" width="280px" justifyContent="space-between">
        <Grid item width="36px" height="36px">
          <Paper>{value[0]}</Paper>
        </Grid>
        <Grid item width="156px">
          <Slider
            value={value}
            onChange={handleChange}
            disableSwap
            min={minCardsCount}
            max={maxCardsCount}
          />
        </Grid>
        <Grid item width="36px">
          <Paper>{value[1]}</Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
