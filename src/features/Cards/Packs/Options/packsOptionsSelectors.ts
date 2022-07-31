import { AppRootStateType } from 'app/AppRootStateTypes';
import { PacksOptionsStateType } from 'features/Cards/Packs/Options/paksOptionsReducer';

export const getParamsSearchValue = (state: AppRootStateType): string | undefined =>
  state.packsOptions.packName;
export const getParamsMinCardsCount = (state: AppRootStateType): number | undefined =>
  state.packsOptions.min;
export const getParamsMaxCardsCount = (state: AppRootStateType): number | undefined =>
  state.packsOptions.min;
export const getParamsSortPacksValue = (state: AppRootStateType): string | undefined =>
  state.packsOptions.sortPacks;
export const getParamsPacksPage = (state: AppRootStateType): number | undefined =>
  state.packsOptions.page;
export const getParamsPacksPageCount = (state: AppRootStateType): number | undefined =>
  state.packsOptions.pageCount;
export const getParamsUserIdToFilterOwn = (state: AppRootStateType): string | undefined =>
  state.packsOptions.user_id;
export const getPacksOptionsParams = (state: AppRootStateType): PacksOptionsStateType =>
  state.packsOptions;
