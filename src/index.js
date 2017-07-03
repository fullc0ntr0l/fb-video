import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './redux/store';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

import './assets/css/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
