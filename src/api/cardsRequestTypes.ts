import { CardPacksParamsType, PackParamsType } from './cardsAPI';

export type CreatePackType = {
  cardsPack: CardsPackType;
};

type CardsPackType = {
  name: string;
  deckCover: string;
  private: boolean;
};

export type CreateCardType = {
  card: CardType;
};

export type UpdatePackType = {
  cardsPack: {
    _id: string;
    name: string;
    private: boolean;
  };
};

type CardType = {
  cardsPack_id: string;
  question: string;
  answer: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type RequestCreatePackType = {
  create: CreatePackType;
  load: CardPacksParamsType;
};

export type RequestUpdatePackType = {
  update: UpdatePackType;
  load: CardPacksParamsType;
};

export type RequestCreateCardType = {
  create: CreateCardType;
  load: PackParamsType;
};
