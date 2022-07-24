import React from 'react';

import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { Header } from 'common/components/Header/Header';
import { Pages } from 'common/components/Pages/Pages';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Pages />
    </div>
  );
};
