import { buttonStatus } from 'enums/buttonStatus';
import { fieldStatus } from 'enums/fieldStatus';
import { AppRootStateType } from 'types/AppRootStateTypes';

export const getForgotButtonStatus = (state: AppRootStateType): buttonStatus =>
  state.forgot.forgotButtonStatus;

export const getForgotFieldsStatus = (state: AppRootStateType): fieldStatus =>
  state.forgot.forgotFieldsStatus;
