import { HeadCellType } from 'common/components/DataTable/DataTableTypes';

export const headCellsPacks: readonly HeadCellType[] = [
  {
    id: 'name',
    label: 'Name',
    isSortable: true,
    tableType: 'packs',
    width: '30%',
  },
  {
    id: 'cardsCount',
    label: 'Cards',
    isSortable: true,
    tableType: 'packs',
    width: '20%',
  },
  {
    id: 'updated',
    label: 'Last Updated',
    isSortable: true,
    tableType: 'packs',
    width: '20%',
  },
  {
    id: 'user_name',
    label: 'Created by',
    isSortable: true,
    tableType: 'packs',
    width: '18%',
  },
  {
    id: 'actions',
    label: 'Actions',
    isSortable: false,
    tableType: 'packs',
    width: '11%',
  },
];

export const headCellsCards: readonly HeadCellType[] = [
  {
    id: 'question',
    label: 'Question',
    isSortable: false,
    tableType: 'cards',
    width: '30%',
  },
  {
    id: 'answer',
    label: 'Answer',
    isSortable: false,
    tableType: 'cards',
    width: '30%',
  },
  {
    id: 'updated',
    label: 'Last Updated',
    isSortable: true,
    tableType: 'cards',
    width: '15%',
  },
  {
    id: 'grade',
    label: 'Grade',
    isSortable: true,
    tableType: 'cards',
    width: '1%',
  },
  {
    id: 'actions',
    label: '',
    isSortable: false,
    tableType: 'cards',
    width: '8%',
    isOwner: true,
  },
];
