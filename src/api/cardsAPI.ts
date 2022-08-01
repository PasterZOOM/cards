import { instance } from 'api/authAPI';
import { CreateCardType, CreatePackType } from 'api/cardsRequestTypes';
import { CreateCardResponseType, CreatePackResponseType } from 'api/ResponseTypes';
import { sortPacks } from 'features/Cards/CardPacks/CardPacksParams/cardPacksParamsReducer';

export const packsAPI = {
  createPack(data: CreatePackType) {
    return instance.post<CreatePackResponseType>(`cards/pack`, data);
  },
  getPacks(params: CardPacksParamsType) {
    return instance.get<CardPacksType>(`cards/pack`, { params: { ...params } });
  },
};

export const cardsAPI = {
  createCard(data: CreateCardType) {
    return instance.post<CreateCardResponseType>(`cards/card`, data);
  },
};

export type CardPacksType = {
  cardPacks: Array<CardPackType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type CardPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
  deckCover: string | null;
};
export type CardPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: sortPacks;
  page?: number;
  pageCount?: number;
  user_id?: string;
};
