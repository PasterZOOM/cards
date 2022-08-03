import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackParamsType } from 'api/cardsAPI';

const slice = createSlice({
  name: 'packParams',
  initialState: {
    cardsPack_id: '',
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
    changeCardPackId(state, action: PayloadAction<{ cardsPackId: string }>) {
      state.cardsPack_id = action.payload.cardsPackId;
    },
  },
});

export const packParamsReducer = slice.reducer;
export const { changeCardQuestionSearchValue, changeCardPackId } = slice.actions;
