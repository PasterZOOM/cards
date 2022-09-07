import React, { ChangeEvent } from 'react';

import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';

import styles from './Grades.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

const grades = [
  { id: '1', value: 1, label: 'Did not know' },
  { id: '2', value: 2, label: 'Forgot' },
  { id: '3', value: 3, label: 'A lot of thought' },
  { id: '4', value: 4, label: 'Confused' },
  { id: '5', value: 5, label: 'Knew the answer' },
];

type PropsType = {
  setGrade: (grade: number) => void;
};

export const Grades: React.FC<PropsType> = ({ setGrade }): ReturnComponentType => {
  const onChangeRadioHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setGrade(+event.target.value);
  };

  return (
    <FormControl className={styles.main}>
      <FormLabel className={styles.rate}>Rate yourself:</FormLabel>
      <RadioGroup onChange={onChangeRadioHandle} defaultValue={1}>
        {grades.map(grade => (
          <FormControlLabel
            key={grade.id}
            value={grade.value}
            control={<Radio />}
            label={grade.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
