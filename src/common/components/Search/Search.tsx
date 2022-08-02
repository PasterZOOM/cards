import React, { ChangeEvent, useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import Typography from '@mui/material/Typography/Typography';

import styles from 'common/components/Search/Search.module.scss';
import { useDebounce } from 'common/hooks/hooks';

type SearchPropsType = {
  callBack: (value: string) => void;
};

export const Search: React.FC<SearchPropsType> = ({ callBack }) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  useEffect(() => {
    callBack(debouncedValue);
  }, [callBack, debouncedValue]);

  return (
    <div className={styles.main}>
      <Typography className={styles.title}>Search</Typography>
      <OutlinedInput
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Provide your text"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  );
};
