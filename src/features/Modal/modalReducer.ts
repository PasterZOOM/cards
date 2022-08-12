import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CreateCardDataType,
  CreatePackDataType,
  DeleteParamType,
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
      return action.payload;
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
  | (UpdatePackDataType & { loadPacks: boolean })
  | CreateCardDataType
  | UpdateCardDataType
  | (DeleteParamType & { loadPacks: boolean });
