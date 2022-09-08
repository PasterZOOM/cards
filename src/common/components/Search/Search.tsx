import React, { ChangeEvent, useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import Typography from '@mui/material/Typography/Typography';
import { useSearchParams } from 'react-router-dom';

import { getAppStatus } from 'app/appSelectors';
import styles from 'common/components/Search/Search.module.scss';
import { requestStatus } from 'common/enums/requestStatus';
import { useAppSelector } from 'common/hooks/hooks';
import { useDebounce } from 'common/hooks/useDebounce';

type PropsType = {
  search: 'packName' | 'cardQuestion' | 'userName';
};

export const Search: React.FC<PropsType> = ({ search }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get(search) || '');

  const debouncedValue = useDebounce<string>(value);
  const status = useAppSelector(getAppStatus);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };
  const clearSearch = (): void => {
    setValue('');
  };

  useEffect(() => {
    const queryParams: { packName?: string; cardQuestion?: string; userName?: string } =
      {};

    if (debouncedValue) {
      queryParams[search] = debouncedValue;
      searchParams.delete('page');
      setSearchParams(searchParams);
    } else searchParams.delete(search);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    });
  }, [debouncedValue, search, setSearchParams]);

  return (
    <div className={styles.main}>
      <Typography className={styles.title}>Search</Typography>
      <OutlinedInput
        disabled={status === requestStatus.LOADING}
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="Provide your text"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <IconButton size="small" onClick={clearSearch}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </div>
  );
};
