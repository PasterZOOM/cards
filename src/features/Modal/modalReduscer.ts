import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CreateCardDataType,
  DeleteParamType,
  CreatePackDataType,
  UpdateCardDataType,
  UpdatePackDataType,
} from 'api/DataTypes';
import { modal } from 'common/enums/modal';
import { Nullable } from 'common/types/Nullable';

const slice = createSlice({
  name: 'modals',
  initialState: {} as ModalStateType<ModalStateDataType>,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        title: modal;
        data: ModalStateDataType;
      }>,
    ) => {
      state.title = action.payload.title;
      state.data = action.payload.data;
    },
    closeModal: () => {
      return {} as ModalStateType<ModalStateDataType>;
    },
  },
});

export const modalsReducer = slice.reducer;
export const { openModal, closeModal } = slice.actions;

export type ModalStateType<T> = {
  title: Nullable<modal>;
  data: T;
};

export type ModalStateDataType =
  | CreatePackDataType
  | UpdatePackDataType
  | CreateCardDataType
  | UpdateCardDataType
  | DeleteParamType;
