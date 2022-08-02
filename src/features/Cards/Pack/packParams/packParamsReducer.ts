import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackParamsType } from 'api/cardsAPI';

const slice = createSlice({
  name: 'cardPackParams',
  initialState: {
    cardsPack_id: '62e945a1e4941d0004b24393',
    cardQuestion: undefined,
    cardAnswer: undefined,
    min: undefined,
    max: undefined,
    sortCards: undefined,
    page: undefined,
    pageCount: undefined,
  } as PackParamsType,
  reducers: {
    changeCardQuestionSearchValue(
      state,
      action: PayloadAction<{ cardQuestion: string | undefined }>,
    ) {
      state.cardQuestion = action.payload.cardQuestion;
    },
  },
});

export const packParamsReducer = slice.reducer;
export const { changeCardQuestionSearchValue } = slice.actions;
