import {
  PacksParamsType,
  CreateCardDataType,
  CreatePackDataType,
  CardsParamsType,
  UpdatedGradeDataType,
  UpdatePackDataType,
} from 'api/DataTypes';
import { instance } from 'api/instance';
import {
  GetPacksResponseType,
  CreateCardResponseType,
  CreatePackResponseType,
  DeletePackResponseType,
  GetCardsResponseType,
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
    return instance.post<CreateCardResponseType>(`cards/card`, { card: data });
  },
};

export const gradeAPI = {
  updateGrade(data: UpdatedGradeDataType) {
    return instance.put<UpdateGradeResponseType>('cards/grade', data);
  },
};
