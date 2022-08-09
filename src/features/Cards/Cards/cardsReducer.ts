import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { cardAPI, gradeAPI } from 'api/cardsAPI';
import { CardsParamsType, CreateCardDataType, UpdatedGradeDataType } from 'api/DataTypes';
import { CardType, GetCardsResponseType } from 'api/ResponseTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const loadCards = createAsyncThunk(
  'cards/loadCards',
  async (param: CardsParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await cardAPI.getCards(param);

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
  async (data: CreateCardDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await cardAPI.createCard(data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.newCard;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const updatedGrade = createAsyncThunk(
  'cards/updatedGrade',
  async (param: UpdatedGradeDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await gradeAPI.updateGrade(param);

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
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.cards.unshift(action.payload);
    });
    builder.addCase(updatedGrade.fulfilled, (state, action) => {
      state.cards = state.cards.map(card =>
        card._id === action.payload.card_id
          ? { ...card, grade: action.payload.grade, shots: action.payload.shots }
          : card,
      );
    });
  },
});

export const cardsReducer = slice.reducer;
