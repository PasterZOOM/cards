import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardsParamsType } from 'api/DataTypes';

const slice = createSlice({
  name: 'learn',
  initialState: {
    cardsPack_id: '',
    pageCount: 0,
  } as CardsParamsType,
  reducers: {
    setLearnParams: (state, action: PayloadAction<CardsParamsType>) => {
      return action.payload;
    },
  },
});

export const learnReducer = slice.reducer;
export const { setLearnParams } = slice.actions;
