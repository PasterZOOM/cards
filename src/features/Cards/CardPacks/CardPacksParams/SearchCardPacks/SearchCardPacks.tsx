import React, { ChangeEvent, useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import Typography from '@mui/material/Typography/Typography';

import { useAppDispatch, useDebounce } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { changeSearchValue } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';
import styles from 'features/Cards/CardPacks/CardPacksParams/SearchCardPacks/SearchCardPacks.module.scss';

const searchDebounceTime = 700;

export const SearchCardPacks = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, searchDebounceTime);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch(changeSearchValue({ packName: debouncedValue || undefined }));
  }, [debouncedValue, dispatch]);

  return (
    <Grid item className={styles.searchContainer}>
      <Typography className={styles.title}>Search</Typography>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        placeholder="Provide your text"
        className={styles.input}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Grid>
  );
};