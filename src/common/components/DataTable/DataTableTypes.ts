export type Order = 'asc' | 'desc';
export type TableType = 'packs' | 'cards' | 'users';

export type PackData = {
  name: string;
  cardsCount: number;
  updated: string;
  user_name: string;
  actions: string;
  deckCover: string | null;
};

export type CardData = {
  question: string;
  answer: number;
  updated: string;
  grade: string;
};

export type UsersData = {
  email: string;
  name: string;
  publicCardPacksCount: number;
  avatar: string | null;
};

export type DataKeys = keyof PackData | keyof CardData | keyof UsersData;

export type HeadCellType = {
  id: DataKeys;
  label: string;
  isSortable: boolean;
  tableType: TableType;
  width: string;
  isOwner?: boolean;
  withoutPadding?: boolean;
};
