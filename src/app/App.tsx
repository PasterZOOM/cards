import React from 'react';

import { Header } from 'common/components/Header/Header';
import { Pages } from 'common/components/Pages/Pages';

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Pages />
    </div>
  );
};
