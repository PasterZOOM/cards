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

type CardType = {
  cardsPack_id: string;
  question: string;
  answer: string;
};
