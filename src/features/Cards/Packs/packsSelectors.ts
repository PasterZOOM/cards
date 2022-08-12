import { PackType } from 'api/ResponseTypes';
import { AppRootStateType } from 'app/AppRootStateTypes';

export const getMaxCardsCount = (state: AppRootStateType): number =>
  state.packs.maxCardsCount;
export const getMinCardsCount = (state: AppRootStateType): number =>
  state.packs.minCardsCount;
export const getCardPacksTotalCount = (state: AppRootStateType): number =>
  state.packs.cardPacksTotalCount;
export const getCardPacks = (state: AppRootStateType): Array<PackType> =>
  state.packs.cardPacks;
