import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PacksParamsType } from 'api/DataTypes';
import { startPageCount } from 'common/constants/projectConstants';

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
  } as PacksParamsType,
  reducers: {
    setCardPacksParams: (state, action: PayloadAction<PacksParamsType>) => {
      return action.payload;
    },
  },
});

export const packsParamsReducer = slice.reducer;
export const { setCardPacksParams } = slice.actions;
