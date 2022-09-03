import { AppRootStateType } from 'app/AppRootStateTypes';
import { MessageType } from 'features/Chat/ChatMain';

export const getMessages = (state: AppRootStateType): Array<MessageType> =>
  state.chat.messages;
