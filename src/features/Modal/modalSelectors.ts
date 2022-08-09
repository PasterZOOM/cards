import { AppRootStateType } from 'app/AppRootStateTypes';
import { modal } from 'common/enums/modal';
import { Nullable } from 'common/types/Nullable';
import { PackModalType } from 'features/Modal/modalReduscer';

export const getModalOpenStatus = (state: AppRootStateType): Nullable<modal> =>
  state.modals.open;
export const getTitle = (state: AppRootStateType): Nullable<string> => state.modals.title;
export const getPackModal = (state: AppRootStateType): PackModalType =>
  state.modals.packModal;
