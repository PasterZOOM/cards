import { instance } from 'api/authAPI';
import { CreateCardType, CreatePackType } from 'api/cardsRequestTypes';
import { CreateCardResponseType, CreatePackResponseType } from 'api/ResponseTypes';

export const packsAPI = {
  createPack(data: CreatePackType) {
    return instance.post<CreatePackResponseType>(`cards/pack`, data);
  },
  getPacks(params: GetPacksParamsType) {
    return instance.get<CardPacksType>(`cards/pack`, { params: { ...params } });
  },
};

export const cardsAPI = {
  createCard(data: CreateCardType) {
    return instance.post<CreateCardResponseType>(`cards/card`, data);
  },
};

export type GetPacksParamsType = {
  packName?: string;
  sortPacks?: string;
  user_id?: number;
  page?: number;
  pageCount?: number;
  max?: number;
  min?: number;
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
