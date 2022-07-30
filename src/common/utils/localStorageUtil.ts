export const getLocalStorage = (key: string): string | null => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return null;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const setLocalStorage = (key: string, value: string): void => {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};
