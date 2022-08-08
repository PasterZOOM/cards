import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackParamsType } from 'api/cardsRequestTypes';

const startPageCount = 5;

const slice = createSlice({
  name: 'packParams',
  initialState: {
    cardsPack_id: '',
    cardQuestion: undefined,
    cardAnswer: undefined,
    sortCards: undefined,
    page: undefined,
    pageCount: startPageCount,
  } as PackParamsType,
  reducers: {
    setPacksParams: (state, action: PayloadAction<{ params: PackParamsType }>) => {
      return action.payload.params;
    },
  },
});

export const packParamsReducer = slice.reducer;
export const { setPacksParams } = slice.actions;
