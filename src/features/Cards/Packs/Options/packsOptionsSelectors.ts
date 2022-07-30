import { AppRootStateType } from 'app/AppRootStateTypes';
import { PacksOptionsStateType } from 'features/Cards/Packs/Options/paksOptionsReducer';

export const getSearchValue = (state: AppRootStateType): string | null =>
  state.packsOptions.packName;
export const getMinCardsCount = (state: AppRootStateType): number | null =>
  state.packsOptions.min;
export const getMaxCardsCount = (state: AppRootStateType): number | null =>
  state.packsOptions.min;
export const getSortPacksValue = (state: AppRootStateType): string | null =>
  state.packsOptions.sortPacks;
export const getPacksPage = (state: AppRootStateType): number | null =>
  state.packsOptions.page;
export const getPacksPageCount = (state: AppRootStateType): number | null =>
  state.packsOptions.pageCount;
export const getUserIdToFilterOwn = (state: AppRootStateType): string | null =>
  state.packsOptions.user_id;
export const getPacksOptionsParams = (state: AppRootStateType): PacksOptionsStateType =>
  state.packsOptions;
