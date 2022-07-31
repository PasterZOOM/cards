import React, { useCallback, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';

import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import {
  changeValueMaxCardsCount,
  changeValueMinCardsCount,
} from 'features/Cards/Packs/Options/paksOptionsReducer';
import styles from 'features/Cards/Packs/Options/SearchCardPacks/SearchCardPacks.module.scss';
import { getMaxCardsCount, getMinCardsCount } from 'features/Cards/Packs/packsSelectors';

export const NumberOfCards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const minValue = useAppSelector(getMinCardsCount);
  const maxValue = useAppSelector(getMaxCardsCount);

  const [value, setValue] = useState<Array<number>>([minValue, maxValue]);
  const debouncedValue = useDebounce<Array<number>>(value);

  const handleChange = useCallback((event: Event, newValue: number | number[]): void => {
    setValue(newValue as [number, number]);
  }, []);

  useEffect(() => {
    setValue([minValue, maxValue]);
  }, [maxValue, minValue]);

  useEffect(() => {
    dispatch(
      changeValueMinCardsCount({
        min: debouncedValue[0] !== minValue ? debouncedValue[0] : undefined,
      }),
    );
    dispatch(
      changeValueMaxCardsCount({
        max: debouncedValue[1] !== maxValue ? debouncedValue[1] : undefined,
      }),
    );
  }, [dispatch, debouncedValue, minValue, maxValue]);

  return (
    <Grid item>
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
            min={minValue}
            max={maxValue}
          />
        </Grid>
        <Grid item width="36px">
          <Paper>{value[1]}</Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
