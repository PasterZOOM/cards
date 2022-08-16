import React, { ChangeEvent } from 'react';

import styles from './NumberOfCardsInput.module.scss';

type PropsType = {
  value: Array<number>;
  setValue: (numbers: Array<number>) => void;
  activeThumb: 0 | 1;
  minCount: number;
  maxCount: number;
};
export const NumberOfCardsInput: React.FC<PropsType> = ({
  value,
  setValue,
  activeThumb,
  minCount,
  maxCount,
}) => {
  const changeInputValue =
    (activeThumb: number) => (event: ChangeEvent<HTMLInputElement>) => {
      let currentValue = event.currentTarget.valueAsNumber;

      if (currentValue < minCount) currentValue = minCount;
      if (currentValue > maxCount) currentValue = maxCount;

      if (activeThumb === 0)
        setValue([!currentValue ? 0 : Math.trunc(currentValue), value[1]]);
      if (activeThumb === 1)
        setValue([value[0], !currentValue ? 0 : Math.trunc(currentValue)]);
    };

  return (
    <input
      type="number"
      className={styles.input}
      value={value[activeThumb].toFixed()}
      onChange={changeInputValue(activeThumb)}
    />
  );
};
