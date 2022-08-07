import React from 'react';

import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { v1 } from 'uuid';

import styles from './Grades.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

const grades = [
  { id: v1(), value: 1, label: 'Did not know' },
  { id: v1(), value: 2, label: 'Forgot' },
  { id: v1(), value: 3, label: 'A lot of thought' },
  { id: v1(), value: 4, label: 'Confused' },
  { id: v1(), value: 5, label: 'Knew the answer' },
];

export const Grades = (): ReturnComponentType => {
  return (
    <FormControl className={styles.main}>
      <FormLabel className={styles.rate}>Rate yourself:</FormLabel>
      <RadioGroup defaultValue={3}>
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
