import { createSlice } from '@reduxjs/toolkit';

import { Nullable } from 'common/types/Nullable';

const slice = createSlice({
  name: 'modals',
  initialState: {
    open: null,
  } as ModalStateTape,
  reducers: {},
});

export const modalsReducer = slice.reducer;

enum openModal {
  ADD_PACK = 'ADD_PACK',
  ADD_CARD = 'ADD_CARD',
  EDIT_PACK = 'EDIT_PACK',
  EDIT_CARD = 'EDIT_CARD',
  DELETE_PACK = 'DELETE_PACK',
  DELETE_CARD = 'DELETE_CARD',
}

type ModalStateTape = {
  open: Nullable<openModal>;
  addPack: {};
};
