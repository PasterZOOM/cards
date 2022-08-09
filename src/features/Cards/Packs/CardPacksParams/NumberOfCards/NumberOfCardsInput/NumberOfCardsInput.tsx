import React, { ChangeEvent } from 'react';

import styles from './NumberOfCardsInput.module.scss';

import { useAppSelector } from 'common/hooks/hooks';
import { getMaxCardsCount, getMinCardsCount } from 'features/Cards/Packs/packsSelectors';

type PropsType = {
  value: Array<number>;
  setValue: (numbers: Array<number>) => void;
  activeThumb: 0 | 1;
};
export const NumberOfCardsInput: React.FC<PropsType> = ({
  value,
  setValue,
  activeThumb,
}) => {
  const minCardsCount = useAppSelector(getMinCardsCount);
  const maxCardsCount = useAppSelector(getMaxCardsCount);

  const changeInputValue =
    (activeThumb: number) => (event: ChangeEvent<HTMLInputElement>) => {
      let currentValue = event.currentTarget.valueAsNumber;

      if (currentValue < minCardsCount) currentValue = minCardsCount;
      if (currentValue > maxCardsCount) currentValue = maxCardsCount;

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
