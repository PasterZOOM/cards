import React, { useCallback, useEffect, useState } from 'react';

import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';
import { useSearchParams } from 'react-router-dom';

import styles from './NumberOfCards.module.scss';

import { useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { NumberOfCardsInput } from 'features/Cards/Packs/CardPacksParams/NumberOfCards/NumberOfCardsInput/NumberOfCardsInput';
import { getMaxCardsCount, getMinCardsCount } from 'features/Cards/Packs/packsSelectors';

export const NumberOfCards = (): ReturnComponentType => {
  const minCardsCount = useAppSelector(getMinCardsCount);
  const maxCardsCount = useAppSelector(getMaxCardsCount);

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<Array<number>>([
    Number(searchParams.get('min')) || minCardsCount,
    Number(searchParams.get('max')) || maxCardsCount,
  ]);

  const onChangeHandle = (event: Event, newValue: number | Array<number>): void => {
    setValue(newValue as Array<number>);
  };

  const onChangeCommittedHandle = useCallback((): void => {
    const queryParams: { min?: string; max?: string } = {};

    if (value[0] !== minCardsCount) queryParams.min = String(value[0]);
    else searchParams.delete('min');

    if (value[1] !== maxCardsCount) queryParams.max = String(value[1]);
    else searchParams.delete('max');

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    });
  }, [maxCardsCount, minCardsCount, searchParams, setSearchParams, value]);

  useEffect(() => {
    setValue([
      Number(searchParams.get('min')) || minCardsCount,
      Number(searchParams.get('max')) || maxCardsCount,
    ]);
  }, [maxCardsCount, minCardsCount, searchParams]);

  return (
    <div className={styles.main}>
      <Typography className={styles.title}>Number of cards</Typography>
      <div className={styles.params}>
        <NumberOfCardsInput activeThumb={0} value={value} setValue={setValue} />

        <Slider
          className={styles.slider}
          value={value}
          onChange={onChangeHandle}
          onChangeCommitted={onChangeCommittedHandle}
          disableSwap
          min={minCardsCount}
          max={maxCardsCount}
        />

        <NumberOfCardsInput activeThumb={1} value={value} setValue={setValue} />
      </div>
    </div>
  );
};
