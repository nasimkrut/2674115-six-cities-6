import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';
import { getToken } from './services/token';
import { setAuthorizationStatus } from './store/user/user.slice';
import { AuthorizationStatus } from './const';


if (getToken()) {
  store.dispatch(checkAuthAction());
} else {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
