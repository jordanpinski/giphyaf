import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './app';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';
import './index.css';
//import 'react-notifications/lib/notifications.css';

import { StoreProvider } from 'easy-peasy';
import { SkynetProvider } from './state/SkynetContext';
import { store } from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <SkynetProvider>
      <StoreProvider store={store}>
        <App />
        <NotificationContainer />
      </StoreProvider>
    </SkynetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
