import { instance } from 'api/authAPI';
import {
  CardPacksParamsType,
  CardPacksResponseType,
  CreateCardDataType,
  CreatePackType,
  PackParamsType,
  PackResponseType,
  UpdatedGradeDataType,
  UpdatedGradeResponseType,
  UpdatePackType,
  UpdatePackResponseType,
  DeletePackResponseType,
} from 'api/cardsRequestTypes';
import { CreateCardResponseType, CreatePackResponseType } from 'api/ResponseTypes';

export const cardPacksAPI = {
  getPacks(params: CardPacksParamsType) {
    return instance.get<CardPacksResponseType>(`cards/pack`, { params });
  },
  createPack(data: CreatePackType) {
    return instance.post<CreatePackResponseType>(`cards/pack`, data);
  },
  updatePack(data: UpdatePackType) {
    return instance.put<UpdatePackResponseType>(`cards/pack`, data);
  },
  deletePack(packId: string) {
    return instance.delete<DeletePackResponseType>(`cards/pack?id=${packId}`);
  },
};

export const packAPI = {
  getPack(params: PackParamsType) {
    return instance.get<PackResponseType>('cards/card', { params });
  },
  createCard(data: CreateCardDataType) {
    return instance.post<CreateCardResponseType>(`cards/card`, { card: data });
  },
  updatedGrade(data: UpdatedGradeDataType) {
    return instance.put<UpdatedGradeResponseType>('cards/grade', data);
  },
};
