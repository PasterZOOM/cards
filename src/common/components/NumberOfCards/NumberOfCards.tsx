import React, { useCallback, useEffect, useState } from 'react';

import Slider from '@mui/material/Slider/Slider';
import Typography from '@mui/material/Typography/Typography';
import { useSearchParams } from 'react-router-dom';

import styles from './NumberOfCards.module.scss';

import { NumberOfCardsInput } from 'common/components/NumberOfCards/NumberOfCardsInput/NumberOfCardsInput';

type PropsType = {
  minCount: number;
  maxCount: number;
};

export const NumberOfCards: React.FC<PropsType> = ({ minCount, maxCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<Array<number>>([
    Number(searchParams.get('min')) || minCount,
    Number(searchParams.get('max')) || maxCount,
  ]);

  const onChangeHandle = (event: Event, newValue: number | Array<number>): void => {
    setValue(newValue as Array<number>);
  };

  const onChangeCommittedHandle = useCallback((): void => {
    const queryParams: { min?: string; max?: string } = {};

    if (value[0] !== minCount) queryParams.min = String(value[0]);
    else searchParams.delete('min');

    if (value[1] !== maxCount) queryParams.max = String(value[1]);
    else searchParams.delete('max');

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    });
  }, [maxCount, minCount, searchParams, setSearchParams, value]);

  useEffect(() => {
    setValue([
      Number(searchParams.get('min')) || minCount,
      Number(searchParams.get('max')) || maxCount,
    ]);
  }, [maxCount, minCount, searchParams]);

  return (
    <div className={styles.main}>
      <Typography className={styles.title}>Number of cards</Typography>
      <div className={styles.params}>
        <NumberOfCardsInput
          activeThumb={0}
          value={value}
          setValue={setValue}
          minCount={minCount}
          maxCount={maxCount}
        />

        <Slider
          className={styles.slider}
          value={value}
          onChange={onChangeHandle}
          onChangeCommitted={onChangeCommittedHandle}
          disableSwap
          min={minCount}
          max={maxCount}
        />

        <NumberOfCardsInput
          activeThumb={1}
          value={value}
          setValue={setValue}
          minCount={minCount}
          maxCount={maxCount}
        />
      </div>
    </div>
  );
};
