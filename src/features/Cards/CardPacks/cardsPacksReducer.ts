import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cardPacksAPI } from 'api/cardsAPI';
import {
  CardPacksParamsType,
  CardPacksResponseType,
  RequestCreatePackType,
} from 'api/cardsRequestTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const createPack = createAsyncThunk(
  'cardPacks/createPack',
  async (data: RequestCreatePackType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      await cardPacksAPI.createPack(data.create);

      dispatch(loadCardPacks(data.load));

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const loadCardPacks = createAsyncThunk(
  'cardPacks/loadCardPacks',
  async (param: CardPacksParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await cardPacksAPI.getPacks(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'cardPacks',
  initialState: {
    cardPacks: [],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
  } as CardPacksResponseType,
  reducers: {
    setPageNumber(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page;
    },
    setPageCount(state, action: PayloadAction<{ pageCount: number }>) {
      state.pageCount = action.payload.pageCount;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCardPacks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setPageNumber, setPageCount } = slice.actions;

export const cardsPacksReducer = slice.reducer;
