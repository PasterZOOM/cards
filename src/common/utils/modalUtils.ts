import { AppDispatch } from 'app/AppRootStateTypes';
import { ModalStateType, setModalStatus } from 'features/Modal/modalReduscer';

export const closeModal = (dispatch: AppDispatch): void => {
  dispatch(setModalStatus({ modal: {} as ModalStateType }));
};
export const openModal = (modal: ModalStateType, dispatch: AppDispatch): void => {
  dispatch(setModalStatus({ modal }));
};
