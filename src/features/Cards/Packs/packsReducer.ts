import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { packAPI } from 'api/cardsAPI';
import { CreatePackDataType, PacksParamsType, UpdatePackDataType } from 'api/DataTypes';
import { GetPacksResponseType, PackType } from 'api/ResponseTypes';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { saveTitle } from 'common/utils/localStorageUtil';

export const loadPacks = createAsyncThunk(
  'packs/loadPacks',
  async (param: PacksParamsType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.getPacks(param);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const createPack = createAsyncThunk(
  'packs/createPack',
  async (data: CreatePackDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.createPack(data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.newCardsPack;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const updatePack = createAsyncThunk(
  'packs/updatePack',
  async (data: UpdatePackDataType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.updatePack(data);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));
      saveTitle(res.data.updatedCardsPack.name);

      return res.data.updatedCardsPack;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

export const deletePack = createAsyncThunk(
  'packs/deletePack',
  async (packId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus({ status: requestStatus.LOADING }));

      const res = await packAPI.deletePack(packId);

      dispatch(setAppStatus({ status: requestStatus.SUCCEEDED }));

      return res.data.deletedCardsPack._id;
    } catch (e) {
      handleError(e, dispatch);

      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'packs',
  initialState: {
    cardPacks: [] as Array<PackType>,
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
  } as GetPacksResponseType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPacks.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createPack.fulfilled, (state, action) => {
      state.cardPacks.unshift(action.payload);
    });
    builder.addCase(updatePack.fulfilled, (state, action) => {
      state.cardPacks = state.cardPacks.map(pack =>
        pack._id === action.payload._id ? action.payload : pack,
      );
    });
    builder.addCase(deletePack.fulfilled, (state, action) => {
      state.cardPacks = state.cardPacks.filter(pack => pack._id !== action.payload);
    });
  },
});

export const packsReducer = slice.reducer;
