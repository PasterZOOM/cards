import { sortPacks } from 'common/enums/sortPacks';

export type CardPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: sortPacks;
  page?: number;
  pageCount?: number;
  user_id?: string;
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
export type CreatePackDataType = {
  name: string;
  deckCover: string;
  private: boolean;
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
export type UpdatePackDataType = {
  _id: string;
  name: string;
  private: boolean;
};
export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type DeletePackResponseType = {
  deletedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type PackParamsType = {
  cardsPack_id: string;
  cardQuestion?: string;
  cardAnswer?: string;
  sortCards?: string;
  page?: number;
  pageCount?: number;
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
export type CreateCardDataType = {
  cardsPack_id: string;
  question: string;
  answer: string;
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

export type UpdatedGradeDataType = {
  grade: number;
  card_id: string;
};
export type UpdatedGradeResponseType = {
  updatedGrade: UpdatedGradeType;
  token: string;
  tokenDeathTime: number;
};
export type UpdatedGradeType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};
