import { AnotherUserType } from 'api/ResponseTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getAnotherUser = (state: AppRootStateType): AnotherUserType => state.user;
