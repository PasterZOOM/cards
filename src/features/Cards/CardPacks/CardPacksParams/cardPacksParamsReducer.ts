import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { URLParamsType } from 'common/types/URLParamsType';

const startPageCount = 5;

const slice = createSlice({
  name: 'cardPacksParams',
  initialState: {
    cardsPack_id: undefined,
    page: undefined,
    sortCards: undefined,
    min: undefined,
    max: undefined,
    cardAnswer: undefined,
    packName: undefined,
    sortPacks: undefined,
    user_id: undefined,
    pageCount: String(startPageCount),
  } as URLParamsType,
  reducers: {
    setCardPacksParams: (state, action: PayloadAction<{ params: URLParamsType }>) => {
      return action.payload.params;
    },
  },
});

export const cardPacksParamsReducer = slice.reducer;
export const { setCardPacksParams } = slice.actions;
