import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { cardAPI, gradeAPI } from 'api/cardsAPI';
import {
  CardsParamsType,
  CreateCardDataType,
  UpdateCardDataType,
  UpdatedGradeDataType,
} from 'api/DataTypes';
import { CardType, GetCardsResponseType } from 'api/ResponseTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { updatePack } from 'features/Cards/Packs/packsReducer';

export const loadCards = createAsyncThunk(
  'cards/loadCards',
  async (params: CardsParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await cardAPI.getCards(params);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const createCard = createAsyncThunk(
  'cards/createCard',
  async (
    params: { data: CreateCardDataType; params: CardsParamsType },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      await cardAPI.createCard(params.data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(loadCards(params.params));
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (
    params: { data: UpdateCardDataType; params: CardsParamsType },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      await cardAPI.updateCard(params.data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(loadCards(params.params));
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (
    params: { cardId: string; params: CardsParamsType },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      await cardAPI.deleteCard(params.cardId);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      dispatch(loadCards(params.params));
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const updatedGrade = createAsyncThunk(
  'cards/updatedGrade',
  async (params: UpdatedGradeDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await gradeAPI.updateGrade(params);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.updatedGrade;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'cards',
  initialState: {
    cards: [] as Array<CardType>,
    packUserId: '',
    packName: '',
    packPrivate: false,
    packDeckCover: '',
    packCreated: '',
    packUpdated: '',
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
  } as GetCardsResponseType,

  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadCards.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updatedGrade.fulfilled, (state, action) => {
      state.cards = state.cards.map(card =>
        card._id === action.payload.card_id
          ? { ...card, grade: action.payload.grade, shots: action.payload.shots }
          : card,
      );
    });
    builder.addCase(updatePack.fulfilled, (state, action) => {
      state.packName = action.payload;
    });
  },
});

export const cardsReducer = slice.reducer;
