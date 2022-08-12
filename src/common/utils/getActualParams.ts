import { PacksParamsType, CardsParamsType } from 'api/DataTypes';
import { startPageCount } from 'common/constants/projectConstants';
import { sortCards } from 'common/enums/sortCards';
import { sortPacks } from 'common/enums/sortPacks';

export const getActualPacksParams = (searchParams: URLSearchParams): PacksParamsType => {
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

export const getActualCardsParams = (searchParams: URLSearchParams): CardsParamsType => {
  return {
    cardsPack_id: String(searchParams.get('cardsPack_id')),
    page: Number(searchParams.get('page')) || undefined,
    sortCards: (searchParams.get('sortCards') as sortCards) || undefined,
    pageCount: Number(searchParams.get('pageCount')) || startPageCount,
    cardQuestion: searchParams.get('cardQuestion') || undefined,
  };
};
