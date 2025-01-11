import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // إضافة الامتداد .js
import { Provider } from 'react-redux';
import store from './redux/store.js'; // إضافة الامتداد .js
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);