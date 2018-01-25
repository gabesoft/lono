import React from 'react';
import ReactDOM from 'react-dom';

import App from 'client/App';

const root = document.getElementById('root');

if (root instanceof Element) {
  ReactDOM.render(<App />, root);
}
