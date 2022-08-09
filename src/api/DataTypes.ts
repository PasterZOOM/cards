import { sortPacks } from 'common/enums/sortPacks';

export type RegisterDataType = {
  email: string;
  password: string;
};
export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type UpdateUserDataType = {
  name: string;
  avatar: string;
};

export type PacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: sortPacks;
  page?: number;
  pageCount?: number;
  user_id?: string;
};
export type CreatePackDataType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};
export type UpdatePackDataType = {
  _id: string;
  name: string;
  private: boolean;
};

export type CardsParamsType = {
  cardsPack_id: string;
  cardQuestion?: string;
  cardAnswer?: string;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CreateCardDataType = {
  cardsPack_id: string;
  question: string;
  answer: string;
};

export type UpdatedGradeDataType = {
  grade: number;
  card_id: string;
};
