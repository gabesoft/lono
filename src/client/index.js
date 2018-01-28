import React from 'react';
import ReactDOM from 'react-dom';

import App from 'client/App';
import logger from 'redux-logger';
import reducers from 'client/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const root = document.getElementById('root');
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducers, middleware);

if (root instanceof Element) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, root);
}
