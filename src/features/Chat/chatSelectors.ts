import { MessageType } from 'api/ResponseTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getMessages = (state: AppRootStateType): Array<MessageType> =>
  state.chat.messages;
