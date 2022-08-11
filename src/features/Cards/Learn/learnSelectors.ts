import { CardsParamsType } from 'api/DataTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getLearnParams = (state: AppRootStateType): CardsParamsType => state.learn;
