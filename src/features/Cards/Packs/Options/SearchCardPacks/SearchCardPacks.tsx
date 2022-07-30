import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import Typography from '@mui/material/Typography/Typography';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import styles from 'features/Cards/Packs/Options/SearchCardPacks/SearchCardPacks.module.scss';

export const SearchCardPacks = (): ReturnComponentType => {
  return (
    <Grid item className={styles.searchContainer}>
      <Typography className={styles.title}>Search</Typography>
      <OutlinedInput
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
