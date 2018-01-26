import React from 'react';
import ReactDOM from 'react-dom';

import App from 'client/App';
import reducers from 'client/reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const root = document.getElementById('root');
const store = createStore(reducers);

if (root instanceof Element) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, root);
}
