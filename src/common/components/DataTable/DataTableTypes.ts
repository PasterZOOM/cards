export type Order = 'asc' | 'desc';

export type PackData = {
  packTitle: string;
  cardsCount: number;
  updatePackDate: string;
  creatorName: string;
  actions: string;
};

export type CardData = {
  question: string;
  answer: number;
  updateCardDate: string;
  rating: string;
};

export type DataKeys = keyof PackData | keyof CardData;

export type HeadCellType = {
  id: keyof PackData | keyof CardData;
  label: string;
  numeric: boolean;
  isSortable: boolean;
  tableType: 'packs' | 'cards';
};
