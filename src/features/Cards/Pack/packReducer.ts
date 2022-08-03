import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cardPackAPI, CardType, PackParamsType, PackResponseType } from 'api/cardsAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { changeCardPackId } from 'features/Cards/Pack/packParams/packParamsReducer';

export const loadPack = createAsyncThunk(
  'pack/loadPack',
  async (param: PackParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));
      const res = await cardPackAPI.getCardPack(param);

      dispatch(changeCardPackId({ cardsPackId: param.cardsPack_id }));
      dispatch(setCards(res.data.cards));
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
    cards: {
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
    cardPackName: 'He',
  },
  reducers: {
    changePackName(state, action: PayloadAction<{ cardPackName: string }>) {
      state.cardPackName = action.payload.cardPackName;
    },
    setCards(state, action: PayloadAction<CardType[]>) {
      state.cards.cards = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPack.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
  },
});

export const packReducer = slice.reducer;
export const { changePackName, setCards } = slice.actions;
