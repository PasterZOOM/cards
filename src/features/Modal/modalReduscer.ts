import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { modal } from 'common/enums/modal';

const slice = createSlice({
  name: 'modals',
  initialState: {} as ModalStateType,
  reducers: {
    setModalStatus: (state, action: PayloadAction<{ modal: ModalStateType }>) => {
      return action.payload.modal;
    },
  },
});

export const modalsReducer = slice.reducer;
export const { setModalStatus } = slice.actions;

export type ModalStateType = {
  open: modal;
  title: string;
  packModal: PackModalType;
};
export type PackModalType = {
  _id: string;
  name: string;
  private: boolean;
};
