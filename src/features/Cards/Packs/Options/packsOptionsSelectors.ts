import { AppRootStateType } from 'app/AppRootStateTypes';
import { PacksOptionsStateType } from 'features/Cards/Packs/Options/paksOptionsReducer';

export const getParamsSearchValue = (state: AppRootStateType): string | null =>
  state.packsOptions.packName;
export const getParamsMinCardsCount = (state: AppRootStateType): number | null =>
  state.packsOptions.min;
export const getParamsMaxCardsCount = (state: AppRootStateType): number | null =>
  state.packsOptions.min;
export const getParamsSortPacksValue = (state: AppRootStateType): string | null =>
  state.packsOptions.sortPacks;
export const getParamsPacksPage = (state: AppRootStateType): number | null =>
  state.packsOptions.page;
export const getParamsPacksPageCount = (state: AppRootStateType): number | null =>
  state.packsOptions.pageCount;
export const getParamsUserIdToFilterOwn = (state: AppRootStateType): string | null =>
  state.packsOptions.user_id;
export const getPacksOptionsParams = (state: AppRootStateType): PacksOptionsStateType =>
  state.packsOptions;
