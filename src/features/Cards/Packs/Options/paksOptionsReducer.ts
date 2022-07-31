import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'packsOptions',
  initialState: { pageCount: 10 } as PacksOptionsStateType,
  reducers: {
    changeSearchValue: (state, action: PayloadAction<{ packName: string | null }>) => {
      state.packName = action.payload.packName;
    },
    changeValueMinCardsCount: (state, action: PayloadAction<{ min: number | null }>) => {
      state.min = action.payload.min;
    },
    changeValueMaxCardsCount: (state, action: PayloadAction<{ max: number | null }>) => {
      state.max = action.payload.max;
    },
    changeValueSortPacks: (
      state,
      action: PayloadAction<{ sortPacks: sortPacks | null }>,
    ) => {
      state.sortPacks = action.payload.sortPacks;
    },
    changePacksPage: (state, action: PayloadAction<{ page: number | null }>) => {
      state.page = action.payload.page;
    },
    changePacksPageCount: (
      state,
      action: PayloadAction<{ pageCount: number | null }>,
    ) => {
      state.pageCount = action.payload.pageCount;
    },
    changeFilterByOwn: (state, action: PayloadAction<{ userId: string | null }>) => {
      state.user_id = action.payload.userId;
    },
  },
});

export const packsOptionsReducer = slice.reducer;
export const {
  changeSearchValue,
  changeValueMinCardsCount,
  changeValueMaxCardsCount,
  changeValueSortPacks,
  changePacksPage,
  changePacksPageCount,
  changeFilterByOwn,
} = slice.actions;

export type PacksOptionsStateType = {
  packName: string | null;
  min: number | null;
  max: number | null;
  sortPacks: sortPacks | null;
  page: number | null;
  pageCount: number | null;
  user_id: string | null;
};
export enum sortPacks {
  ASC_USER_NAME = '1user_name',
  DES_USER_NAME = '0user_name',
  ASC_NAME = '1name',
  DES_NAME = '0name',
  ASC_CARDS_COUNT = '1cardsCount',
  DES_CARDS_COUNT = '0cardsCount',
  ASC_CREATED = '1created',
  DES_CREATED = '0created',
  ASC_UPDATE = '1updated',
  DES_UPDATE = '0updated',
}
