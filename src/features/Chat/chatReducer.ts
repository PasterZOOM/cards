import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chatAPI } from 'api/chatAPI';
import { MessageType } from 'features/Chat/Chat';

export const createConnection = createAsyncThunk(
  'chat/createConnection',
  (param, { dispatch }) => {
    chatAPI.createConnection();
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
export const setClient = createAsyncThunk(
  'chat/setClientName',
  (params: { chatUserId: string; name: string }) => {
    chatAPI.sentClient(params.chatUserId, params.name);
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
  initialState: { messages: [] as Array<MessageType> },
  reducers: {
    initMessagesHandle(state, action: PayloadAction<Array<MessageType>>) {
      state.messages = action.payload;
    },
    newMessageSandHandle(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
    },
  },
});

export const chatReducer = slice.reducer;
export const { initMessagesHandle, newMessageSandHandle } = slice.actions;
