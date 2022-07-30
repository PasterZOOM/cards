import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CardPacksType, packsAPI } from 'api/cardsAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';
import { PacksOptionsStateType } from 'features/Cards/Packs/Options/paksOptionsReducer';

export const getPacks = createAsyncThunk(
  'packs/getPacks',
  async (param: PacksOptionsStateType, { dispatch, rejectWithValue }) => {
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
  name: 'packs',
  initialState: {} as CardPacksType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const packsReducer = slice.reducer;
