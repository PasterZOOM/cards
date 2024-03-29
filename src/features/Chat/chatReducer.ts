import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chatAPI } from 'api/chatAPI';
import { MessageType } from 'api/ResponseTypes';

export const createConnection = createAsyncThunk(
  'chat/createConnection',
  (params: { userId: string; name: string; avatar: string | null }, { dispatch }) => {
    chatAPI.createConnection(params.userId, params.name, params.avatar);
    chatAPI.subscribe(
      messages => {
        dispatch(initMessagesHandle(messages));
      },
      message => {
        dispatch(newMessageSandHandle(message));
      },
    );
  },
);

export const setMessage = createAsyncThunk('chat/setClientName', (param: string) => {
  chatAPI.sentMessage(param);
});
export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
  chatAPI.destroyConnection();
});

const slice = createSlice({
  name: 'chat',
  initialState: {
    messages: [
      {
        message: '',
        _id: '',
        user: {
          _id: '',
          name: '',
          avatar: '',
        },
      },
    ] as Array<MessageType>,
    oldScrollPosition: 0,
  },
  reducers: {
    initMessagesHandle(state, action: PayloadAction<Array<MessageType>>) {
      state.messages = action.payload;
    },
    newMessageSandHandle(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
    },
    setOldScrollPosition(state, action: PayloadAction<number>) {
      state.oldScrollPosition = action.payload;
    },
  },
});

export const chatReducer = slice.reducer;
export const { initMessagesHandle, newMessageSandHandle, setOldScrollPosition } =
  slice.actions;
