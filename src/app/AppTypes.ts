import { snackbarType } from 'enums/snackbarType';

export type SnackbarType = {
  type: snackbarType | undefined;
  message: string | null;
};
