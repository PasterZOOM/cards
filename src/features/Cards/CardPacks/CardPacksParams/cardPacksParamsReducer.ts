import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardPacksParamsType } from 'api/cardsAPI';

const startPageCount = 5;

const slice = createSlice({
  name: 'cardPacksParams',
  initialState: {
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: undefined,
    pageCount: startPageCount,
    user_id: undefined,
  } as CardPacksParamsType,
  reducers: {
    setCardPacksParams: (
      state,
      action: PayloadAction<{ params: CardPacksParamsType }>,
    ) => {
      return action.payload.params;
    },
  },
});

export const cardPacksParamsReducer = slice.reducer;
export const { setCardPacksParams } = slice.actions;
