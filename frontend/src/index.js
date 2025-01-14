import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.js';  // تأكد من وجود الامتداد .js
import { Provider } from 'react-redux';
import store from './redux/store.js';  // تأكد من وجود الامتداد .js
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './i18n.js';  // تأكد من وجود الامتداد .js
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Render the React application to the DOM

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={5000} />
      <Root />
    </Provider>
  </React.StrictMode>
);