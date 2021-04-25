import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store.js';
import reportWebVitals from './reportWebVitals';
import App from './app';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';
import './index.css';
//import 'react-notifications/lib/notifications.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
      <NotificationContainer />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
