import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { buttonStatus } from 'enums/buttonStatus';
import { fieldStatus } from 'enums/fieldStatus';

const initialState = {
  forgotButtonStatus: buttonStatus.DISABLED,
  forgotFieldsStatus: fieldStatus.ACTIVE,
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeForgotButtonStatus: (
      state,
      action: PayloadAction<{ forgotButtonStatus: buttonStatus }>,
    ) => {
      state.forgotButtonStatus = action.payload.forgotButtonStatus;
    },
    changeForgotFieldStatus: (
      state,
      action: PayloadAction<{ forgotFieldsStatus: fieldStatus }>,
    ) => {
      state.forgotFieldsStatus = action.payload.forgotFieldsStatus;
    },
  },
});

export const forgotReducer = slice.reducer;
export const { changeForgotButtonStatus, changeForgotFieldStatus } = slice.actions;
