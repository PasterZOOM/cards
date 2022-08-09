import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardsParamsType } from 'api/DataTypes';

const startPageCount = 5;

const slice = createSlice({
  name: 'cardsParams',
  initialState: {
    cardsPack_id: '',
    cardQuestion: undefined,
    cardAnswer: undefined,
    sortCards: undefined,
    page: undefined,
    pageCount: startPageCount,
  } as CardsParamsType,
  reducers: {
    setCardsParams: (state, action: PayloadAction<{ params: CardsParamsType }>) => {
      return action.payload.params;
    },
  },
});

export const cardsParamsReducer = slice.reducer;
export const { setCardsParams } = slice.actions;
