import React from 'react';
import ReactDOM from 'react-dom';

import App from 'client/App';
import logger from 'redux-logger';
import reducers from 'client/reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const root = document.getElementById('root');
const store = createStore(reducers, applyMiddleware(logger));

if (root instanceof Element) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, root);
}
