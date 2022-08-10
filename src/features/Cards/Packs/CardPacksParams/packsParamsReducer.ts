import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PacksParamsType } from 'api/DataTypes';

const slice = createSlice({
  name: 'cardPacksParams',
  initialState: {
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: undefined,
    pageCount: undefined,
    user_id: undefined,
  } as PacksParamsType,
  reducers: {
    setCardPacksParams: (state, action: PayloadAction<{ params: PacksParamsType }>) => {
      return action.payload.params;
    },
  },
});

export const packsParamsReducer = slice.reducer;
export const { setCardPacksParams } = slice.actions;
