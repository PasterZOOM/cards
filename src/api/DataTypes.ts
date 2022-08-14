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
  name?: string;
  avatar?: string;
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
export type PackDataType = {
  name: string;
  private: boolean;
};
export type CreatePackDataType = PackDataType;
export type UpdatePackDataType = {
  _id: string;
} & CreatePackDataType;

export type CardsParamsType = {
  cardsPack_id: string;
  cardQuestion?: string;
  cardAnswer?: string;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CardDataType = {
  question: string;
  answer: string;
};
export type CreateCardDataType = { cardsPack_id: string } & CardDataType;
export type UpdateCardDataType = { _id: string } & CardDataType;

export type DeleteParamType = { _id: string; name: string };

export type UpdatedGradeDataType = {
  grade: number;
  card_id: string;
};
