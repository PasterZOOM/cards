import { AppRootStateType } from 'app/AppRootStateTypes';

export const getMaxCardsCount = (state: AppRootStateType): number =>
  state.packs.maxCardsCount;
export const getMinCardsCount = (state: AppRootStateType): number =>
  state.packs.minCardsCount;
