export type Order = 'asc' | 'desc';

export type PackData = {
  name: string;
  cardsCount: number;
  updated: string;
  user_name: string;
  actions: string;
};

export type CardData = {
  question: string;
  answer: number;
  updated: string;
  grade: string;
};

export type DataKeys = keyof PackData | keyof CardData;

export type HeadCellType = {
  id: keyof PackData | keyof CardData;
  label: string;
  isSortable: boolean;
  tableType: 'packs' | 'cards';
  width: string;
  isOwner?: boolean;
};
