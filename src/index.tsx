import React from 'react';

import OverlayScrollbars from 'overlayscrollbars';
import ReactDOM from 'react-dom/client';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './index.css';
import { Provider } from 'react-redux/es/exports';
import { HashRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { App } from 'app/App';
import { store } from 'app/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
);

OverlayScrollbars(document.body, {
  scrollbars: {
    clickScrolling: true,
  },
});

reportWebVitals();
