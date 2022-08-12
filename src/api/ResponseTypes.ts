export type InfoResponseType = {
  info: string;
  error: string;
};

export type UserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  avatar: string | null;
} & TokenType;
export type RegisterResponseType = {
  addedUser: UserType;
  error?: string;
};
export type MeResponseType = UserType & {
  error?: string;
};
export type UpdatedUserResponseType = {
  updatedUser: UserType;
  error?: string;
} & TokenType;

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
export type GetPacksResponseType = {
  cardPacks: Array<PackType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
} & TokenType;
export type CreatePackResponseType = {
  newCardsPack: PackType;
} & TokenType;
export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
} & TokenType;
export type DeletePackResponseType = {
  deletedCardsPack: PackType;
} & TokenType;

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
  answerImg: string;
  answerVideo: string;
  questionImg: string;
  questionVideo: string;
};
export type GetCardsResponseType = {
  cards: Array<CardType>;
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packDeckCover: string;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
} & TokenType;
export type CardResponseType = {
  newCard: CardType;
} & TokenType;
export type UpdateCardResponseType = {
  updatedCard: CardType;
} & TokenType;
export type DeleteCardResponseType = {
  deletedCard: CardType;
} & TokenType;

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
export type UpdateGradeResponseType = {
  updatedGrade: UpdatedGradeType;
} & TokenType;

type TokenType = {
  token: string;
  tokenDeathTime: number;
};
