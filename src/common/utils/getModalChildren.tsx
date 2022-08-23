import React from 'react';

import { modal } from 'common/enums/modal';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { CardsModal } from 'features/Modal/CardsModal/CardsModal';
import { DeleteModal } from 'features/Modal/DeleteModal/DeleteModal';
import { PackModal } from 'features/Modal/PackModal/PackModal';

export const getModalChildren = (
  title: string | null,
): ReturnComponentType | undefined => {
  if (title === modal.ADD_PACK || title === modal.EDIT_PACK) return <PackModal />;
  if (title === modal.ADD_CARD || title === modal.EDIT_CARD) return <CardsModal />;
  if (title === modal.DELETE_PACK || title === modal.DELETE_CARD) return <DeleteModal />;
};
