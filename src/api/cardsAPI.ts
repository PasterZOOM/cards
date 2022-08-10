import {
  CardsParamsType,
  CreateCardDataType,
  CreatePackDataType,
  PacksParamsType,
  UpdateCardDataType,
  UpdatedGradeDataType,
  UpdatePackDataType,
} from 'api/DataTypes';
import { instance } from 'api/instance';
import {
  CardResponseType,
  CreatePackResponseType,
  DeleteCardResponseType,
  DeletePackResponseType,
  GetCardsResponseType,
  GetPacksResponseType,
  UpdateCardResponseType,
  UpdateGradeResponseType,
  UpdatePackResponseType,
} from 'api/ResponseTypes';

export const packAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<GetPacksResponseType>(`cards/pack`, { params });
  },
  createPack(data: CreatePackDataType) {
    return instance.post<CreatePackResponseType>(`cards/pack`, { cardsPack: data });
  },
  updatePack(data: UpdatePackDataType) {
    return instance.put<UpdatePackResponseType>(`cards/pack`, { cardsPack: data });
  },
  deletePack(packId: string) {
    return instance.delete<DeletePackResponseType>(`cards/pack?id=${packId}`);
  },
};

export const cardAPI = {
  getCards(params: CardsParamsType) {
    return instance.get<GetCardsResponseType>('cards/card', { params });
  },
  createCard(data: CreateCardDataType) {
    return instance.post<CardResponseType>(`cards/card`, { card: data });
  },
  updateCard(data: UpdateCardDataType) {
    return instance.put<UpdateCardResponseType>(`cards/card`, { card: data });
  },
  deleteCard(cardId: string) {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${cardId}`);
  },
};

export const gradeAPI = {
  updateGrade(data: UpdatedGradeDataType) {
    return instance.put<UpdateGradeResponseType>('cards/grade', data);
  },
};
