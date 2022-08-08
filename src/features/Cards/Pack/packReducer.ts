import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { packAPI } from 'api/cardsAPI';
import {
  CardType,
  PackParamsType,
  PackResponseType,
  CreateCardDataType,
  UpdatedGradeDataType,
} from 'api/cardsRequestTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const createCard = createAsyncThunk(
  'pack/createCard',
  async (data: CreateCardDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.createCard(data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return { res: res.data, data };
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

      const res = await packAPI.getPack(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const updatedGrade = createAsyncThunk(
  'pack/updatedGrade',
  async (param: UpdatedGradeDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.updatedGrade(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.updatedGrade;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'pack',
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
  } as PackResponseType,

  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPack.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updatedGrade.fulfilled, (state, action) => {
      state.cards = state.cards.map(card =>
        card._id === action.payload.card_id
          ? { ...card, grade: action.payload.grade, shots: action.payload.shots }
          : card,
      );
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      const { rating, __v, grade, shots, created, more_id, type, updated, user_id, _id } =
        action.payload.res.newCard;
      const { cardsPack_id, answer, question } = action.payload.data;

      state.cards.unshift({
        _id,
        cardsPack_id,
        user_id,
        answer,
        question,
        grade,
        shots,
        questionImg: '',
        answerImg: '',
        answerVideo: '',
        questionVideo: '',
        comments: '',
        type,
        rating,
        more_id,
        created,
        updated,
        __v,
      });
    });
  },
});

export const packReducer = slice.reducer;
