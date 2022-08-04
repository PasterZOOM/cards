import { HeadCellType } from 'common/components/DataTable/DataTableTypes';

export const headCellsPacks: readonly HeadCellType[] = [
  {
    id: 'packTitle',
    numeric: false,
    label: 'Name',
    isSortable: true,
    tableType: 'packs',
  },
  {
    id: 'cardsCount',
    numeric: true,
    label: 'Cards',
    isSortable: true,
    tableType: 'packs',
  },
  {
    id: 'updatePackDate',
    numeric: true,
    label: 'Last Updated',
    isSortable: true,
    tableType: 'packs',
  },
  {
    id: 'creatorName',
    numeric: true,
    label: 'Created by',
    isSortable: true,
    tableType: 'packs',
  },
  {
    id: 'actions',
    numeric: true,
    label: 'Actions',
    isSortable: false,
    tableType: 'packs',
  },
];

export const headCellsCards: readonly HeadCellType[] = [
  {
    id: 'question',
    numeric: false,
    label: 'Question',
    isSortable: false,
    tableType: 'cards',
  },
  {
    id: 'answer',
    numeric: true,
    label: 'Answer',
    isSortable: false,
    tableType: 'cards',
  },
  {
    id: 'updateCardDate',
    numeric: true,
    label: 'Last Updated',
    isSortable: true,
    tableType: 'cards',
  },
  {
    id: 'rating',
    numeric: true,
    label: 'Grade',
    isSortable: false,
    tableType: 'cards',
  },
];
