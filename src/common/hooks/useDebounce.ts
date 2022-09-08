import { useEffect, useState } from 'react';

const defaultDebounceTime = 700;

export const useDebounce = <T>(value: T, delay = defaultDebounceTime): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
