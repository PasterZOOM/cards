import { AppRootStateType } from 'app/AppRootStateTypes';
import { modal } from 'common/enums/modal';
import { Nullable } from 'common/types/Nullable';
import { ModalStateDataType } from 'features/Modal/modalReduscer';

export const getModalTitle = (state: AppRootStateType): Nullable<modal> =>
  state.modals.title;
export const getPackData = (state: AppRootStateType): ModalStateDataType =>
  state.modals.data;
