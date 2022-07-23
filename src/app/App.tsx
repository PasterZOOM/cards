import React from 'react';

import { Header } from 'common/components/Header/Header';
import { Pages } from 'common/components/Pages/Pages';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  return (
    <div>
      <Header />
      <Pages />
    </div>
  );
};
