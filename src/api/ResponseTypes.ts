export type InfoResponseType = {
  info: string;
  error: string;
};

export type NewUserType = {
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
};
export type UserType = NewUserType & {
  token: string;
  tokenDeathTime: number;
  avatar: string | null;
};
export type RegisterResponseType = {
  addedUser: NewUserType;
  error?: string;
};
export type MeResponseType = UserType & {
  error?: string;
};

export type UpdatedUserResponseType = {
  updatedUser: UserType;
  token: string;
  tokenDeathTime: number;
  error?: string;
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
export type GetPacksResponseType = {
  cardPacks: Array<PackType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type CreatePackResponseType = {
  newCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
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
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};
export type CreateCardResponseType = {
  newCard: CardType;
  token: string;
  tokenDeathTime: number;
};
export type UpdateCardResponseType = {
  updatedCard: CardType;
  token: string;
  tokenDeathTime: number;
};
export type DeleteCardResponseType = {
  deletedCard: CardType;
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
export type UpdateGradeResponseType = {
  updatedGrade: UpdatedGradeType;
  token: string;
  tokenDeathTime: number;
};
