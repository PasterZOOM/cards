import { instance } from 'api/authAPI';
import { CreateCardType, CreatePackType, UpdatePackType } from 'api/cardsRequestTypes';
import {
  CreateCardResponseType,
  CreatePackResponseType,
  UpdatePackResponseType,
} from 'api/ResponseTypes';
import { sortPacks } from 'common/enums/sortPacks';

export const cardPacksAPI = {
  createPack(data: CreatePackType) {
    return instance.post<CreatePackResponseType>(`cards/pack`, data);
  },
  getPacks(params: CardPacksParamsType) {
    return instance.get<CardPacksResponseType>(`cards/pack`, { params });
  },
  updatePack(data: UpdatePackType) {
    return instance.put<UpdatePackResponseType>(`cards/pack`, data);
  },
};

export const cardPackAPI = {
  getCardPack(params: PackParamsType) {
    return instance.get<PackResponseType>('cards/card', { params: { ...params } });
  },
  createCardPack(data: CreateCardType) {
    return instance.post<CreateCardResponseType>(`cards/card`, data);
  },
};

export type CardPacksResponseType = {
  cardPacks: Array<PackType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type PackResponseType = {
  cards: Array<CardType>;
  packUserId: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};
export type PackType = {
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
export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  answerVideo: string;
  questionVideo: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
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
export type PackParamsType = {
  cardsPack_id: string;
  cardQuestion?: string;
  cardAnswer?: string;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
