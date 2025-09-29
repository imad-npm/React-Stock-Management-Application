/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductsContextProvider from './context/ProductsContextProvider';
import { BrowserRouter } from 'react-router-dom';
import TransactionsContextProvider from './context/TransactionsContextProvider';

ReactDOM.render(
  <BrowserRouter>
  
<ProductsContextProvider>
  <TransactionsContextProvider>
  <App />
  </TransactionsContextProvider>
</ProductsContextProvider>

</BrowserRouter>,

  document.querySelector('#root')
);
