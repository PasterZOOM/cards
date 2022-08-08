import { PackType } from 'api/cardsRequestTypes';
import { UserType } from 'features/Auth/User/Profile/ProfileTypes';
import { NewUserType } from 'features/Auth/User/Register/RegisterTypes';

export type MeResponseType = UserType & {
  error?: string;
};
export type RegisterResponseType = {
  addedUser: NewUserType;
  error?: string;
};
export type UpdatedUserResponseType = {
  updatedUser: UserType;
  token: string;
  tokenDeathTime: number;
  error?: string;
};
export type InfoResponseType = {
  info: string;
  error: string;
};

export type ResponseCardsType = {
  _id: string;
  user_id: string;
  grade: number;
  shots: number;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type CreatePackResponseType = {
  newCardsPack: ResponseCardsType & {
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    deckCover: string;
    cardsCount: number;
  };
  token: string;
  tokenDeathTime: number;
};

export type CreateCardResponseType = {
  newCard: ResponseCardsType & {
    cardsPack_id: string;
    answer: string;
    question: string;
    comments: string;
  };
  token: string;
  tokenDeathTime: number;
};

export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};
