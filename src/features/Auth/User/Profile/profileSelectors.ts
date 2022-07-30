import { AppRootStateType } from 'app/AppRootStateTypes';
import { UserType } from 'features/Auth/User/Profile/ProfileTypes';

export const getUser = (state: AppRootStateType): UserType => state.profile.user;
export const getUserId = (state: AppRootStateType): string => state.profile.user._id;
