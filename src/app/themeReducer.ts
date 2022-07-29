import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { theme } from 'common/enums/theme';

const initialState = {
  theme: theme.LIGHT,
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeAC: (state, action: PayloadAction<{ theme: theme }>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const themeReducer = slice.reducer;
export const { changeThemeAC } = slice.actions;
