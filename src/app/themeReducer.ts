import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { theme } from 'common/enums/theme';

const slice = createSlice({
  name: 'theme',
  initialState: {
    theme: theme.LIGHT,
    auto: false,
  },
  reducers: {
    changeTheme: (state, action: PayloadAction<{ theme: theme }>) => {
      state.theme = action.payload.theme;
    },
    toggleAutoTheme: (state, action: PayloadAction<{ theme: theme }>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const themeReducer = slice.reducer;
export const { changeTheme, toggleAutoTheme } = slice.actions;
