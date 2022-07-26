import { buttonStatus } from 'enums/buttonStatus';
import { fieldStatus } from 'enums/fieldStatus';
import { AppRootStateType } from 'types/AppRootStateTypes';

export const getRegisterButtonStatus = (state: AppRootStateType): buttonStatus =>
  state.register.registerButtonStatus;

export const getRegisterFieldsStatus = (state: AppRootStateType): fieldStatus =>
  state.register.registerFieldsStatus;
