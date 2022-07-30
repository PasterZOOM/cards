import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CardPacksType, GetPacksParamsType, packsAPI } from 'api/cardsAPI';
import { setAppStatus } from 'app/appReducer';
import { requestStatus } from 'common/enums/requestStatus';
import { handleError } from 'common/utils/handleError';

export const getPacks = createAsyncThunk(
  'cards/getPacks',
  async (param: GetPacksParamsType, { dispatch, rejectWithValue }) => {
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
  name: 'cards',
  initialState: {} as CardPacksType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const appReducer = slice.reducer;
