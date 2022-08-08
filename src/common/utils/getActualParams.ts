import { CardPacksParamsType, PackParamsType } from 'api/cardsRequestTypes';
import { startPageCount } from 'common/constants/projectConstants';
import { sortCards } from 'common/enums/sortCards';
import { sortPacks } from 'common/enums/sortPacks';

export const getActualCardParamsParams = (
  searchParams: URLSearchParams,
): CardPacksParamsType => {
  return {
    user_id: searchParams.get('user_id') || undefined,
    packName: searchParams.get('packName') || undefined,
    min: Number(searchParams.get('min')) || undefined,
    max: Number(searchParams.get('max')) || undefined,
    sortPacks: (searchParams.get('sortPacks') as sortPacks) || undefined,
    page: Number(searchParams.get('page')) || undefined,
    pageCount: Number(searchParams.get('pageCount')) || startPageCount,
  };
};

export const getActualPackParams = (searchParams: URLSearchParams): PackParamsType => {
  return {
    cardsPack_id: String(searchParams.get('cardsPack_id')),
    page: Number(searchParams.get('page')) || undefined,
    sortCards: (searchParams.get('sortCards') as sortCards) || undefined,
    pageCount: Number(searchParams.get('pageCount')) || startPageCount,
    cardQuestion: searchParams.get('cardQuestion') || undefined,
  };
};
