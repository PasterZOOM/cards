import socketIo from 'socket.io-client';

import { MessageType } from 'api/ResponseTypes';

export const chatAPI = {
  socket: null as null | any,
  createConnection(_id: string, name: string, avatar: string | null) {
    this.socket = socketIo('https://neko-back.herokuapp.com/', {
      query: { _id, name, avatar },
    });
    // this.socket = socketIo('http://localhost:7542/', { query: { _id, name, avatar } });
    this.socket?.emit('init');
  },

  subscribe(
    initMessagesHandle: (massages: Array<MessageType>) => void,
    newMessageSandHandle: (message: MessageType) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesHandle);
    this.socket?.on('new-message-sent', newMessageSandHandle);
  },

  sentMessage(messageText: string) {
    this.socket?.emit('client-message-sent', messageText);
  },

  destroyConnection() {
    this.socket.disconnect();
    this.socket = null;
  },
};
