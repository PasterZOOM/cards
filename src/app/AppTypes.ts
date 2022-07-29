import { snackbarType } from 'common/enums/snackbarType';

export type SnackbarType = {
  type: snackbarType | undefined;
  message: string | null;
};
