import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardPacksType, CardPackType, packsAPI, CardPacksParamsType } from 'api/cardsAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const getCardPacks = createAsyncThunk(
  'cardPacks/getCardPacks',
  async (param: CardPacksParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packsAPI.getPacks(param);

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
    cardPacks: null as null | Array<CardPackType>,
    page: null as null | number,
    pageCount: 1,
    cardPacksTotalCount: null as null | number,
    minCardsCount: null as null | number,
    maxCardsCount: null as null | number,
    token: null as null | string,
    tokenDeathTime: null as null | number,
  } as CardPacksType,
  reducers: {
    setPageNumber(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page;
    },
    setPageCount(state, action: PayloadAction<{ pageCount: number }>) {
      state.pageCount = action.payload.pageCount;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCardPacks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setPageNumber, setPageCount } = slice.actions;

export const cardsPacksReducer = slice.reducer;
