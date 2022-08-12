import React, { ChangeEvent, useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
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
  search: 'packName' | 'cardQuestion';
};

export const Search: React.FC<PropsType> = ({ search }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get('packName') || '');

  const debouncedValue = useDebounce<string>(value);
  const status = useAppSelector(getAppStatus);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const queryParams: { packName?: string; cardQuestion?: string } = {};

    if (debouncedValue) {
      queryParams[search] = debouncedValue;
      searchParams.delete('page');
      setSearchParams(searchParams);
    } else searchParams.delete(search);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    });
  }, [debouncedValue, search, searchParams, setSearchParams]);

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
      />
    </div>
  );
};
