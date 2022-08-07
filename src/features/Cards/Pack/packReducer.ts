import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loadCardPacks } from '../CardPacks/cardsPacksReducer';

import { cardPackAPI, PackParamsType, PackResponseType } from 'api/cardsAPI';
import { RequestCreateCardType } from 'api/cardsRequestTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const createCard = createAsyncThunk(
  '',
  async (data: RequestCreateCardType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      await cardPackAPI.createCardPack(data.create);

      dispatch(loadCardPacks(data.load));

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const loadPack = createAsyncThunk(
  'pack/loadPack',
  async (param: PackParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await cardPackAPI.getCardPack(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'pack',
  initialState: {
    cards: [],
    packUserId: '',
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
  } as PackResponseType,

  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPack.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const packReducer = slice.reducer;
