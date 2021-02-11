import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './store/store';
import { initialState, storeReducer } from './store/reducer';
import { routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={storeReducer}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
    </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
