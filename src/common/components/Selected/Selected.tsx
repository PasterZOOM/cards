import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type SelectedPropsType = {
  callback: (value: string) => void;
  question: string;
};

export const Selected: React.FC<SelectedPropsType> = ({
  callback,
  question,
}): ReturnComponentType => {
  const [value, setValue] = React.useState(question);

  const handleChange = (event: SelectChangeEvent): void => {
    setValue(event.target.value as string);
    callback(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Choose a question format</InputLabel>
      <Select value={value} label="Choose a question format" onChange={handleChange}>
        <MenuItem value="text">Текстовый вопрос</MenuItem>
        <MenuItem value="image">Изображение</MenuItem>
      </Select>
    </FormControl>
  );
};
