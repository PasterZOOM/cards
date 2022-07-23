import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingAC: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const loadReducer = slice.reducer;
export const { loadingAC } = slice.actions;
