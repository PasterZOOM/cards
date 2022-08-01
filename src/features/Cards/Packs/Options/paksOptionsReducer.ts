import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'packsOptions',
  initialState: {
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: undefined,
    pageCount: 10,
    user_id: undefined,
  } as PacksOptionsStateType,
  reducers: {
    changeSearchValue: (
      state,
      action: PayloadAction<{ packName: string | undefined }>,
    ) => {
      state.packName = action.payload.packName;
    },
    changeValueMinCardsCount: (
      state,
      action: PayloadAction<{ min: number | undefined }>,
    ) => {
      state.min = action.payload.min;
    },
    changeValueMaxCardsCount: (
      state,
      action: PayloadAction<{ max: number | undefined }>,
    ) => {
      state.max = action.payload.max;
    },
    changeValueSortPacks: (
      state,
      action: PayloadAction<{ sortPacks: sortPacks | undefined }>,
    ) => {
      state.sortPacks = action.payload.sortPacks;
    },
    changePacksPage: (state, action: PayloadAction<{ page: number | undefined }>) => {
      state.page = action.payload.page;
    },
    changePacksPageCount: (
      state,
      action: PayloadAction<{ pageCount: number | undefined }>,
    ) => {
      state.pageCount = action.payload.pageCount;
    },
    changeFilterByOwn: (state, action: PayloadAction<{ userId: string | undefined }>) => {
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
  packName: string | undefined;
  min: number | undefined;
  max: number | undefined;
  sortPacks: sortPacks | undefined;
  page: number | undefined;
  pageCount: number | undefined;
  user_id: string | undefined;
};
export enum sortPacks {
  ASC_USER_NAME = '1user_name',
  DESC_USER_NAME = '0user_name',
  ASC_NAME = '1name',
  DESC_NAME = '0name',
  ASC_CARDS_COUNT = '1cardsCount',
  DESC_CARDS_COUNT = '0cardsCount',
  ASC_UPDATE = '1updated',
  DESC_UPDATE = '0updated',
}
