import socketIo from 'socket.io-client';

import { MessageType } from 'features/Chat/Chat';

export const chatAPI = {
  socket: null as null | any,
  createConnection() {
    this.socket = socketIo('https://neko-back.herokuapp.com/');
  },

  subscribe(
    initMessagesHandle: (massages: Array<MessageType>) => void,
    newMessageSandHandle: (message: MessageType) => void,
  ) {
    this.socket?.on('init-messages-published', initMessagesHandle);
    this.socket?.on('new-message-sent', newMessageSandHandle);
  },

  sentClient(chatUserId: string, name: string) {
    this.socket?.emit('init', chatUserId);
    this.socket?.emit('client-name-sent', name);
  },
  sentMessage(messageText: string) {
    this.socket?.emit('client-message-sent', messageText);
  },

  destroyConnection() {
    this.socket?.disconnect();
    this.socket = null;
  },
};
