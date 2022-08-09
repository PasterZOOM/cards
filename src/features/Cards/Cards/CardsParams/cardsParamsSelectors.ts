import { CardsParamsType } from 'api/DataTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getCardsParams = (state: AppRootStateType): CardsParamsType =>
  state.cardsParams;
