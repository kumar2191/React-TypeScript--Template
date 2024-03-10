import React from 'react';
import ReactDOM from 'react-dom/client';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/userAuth.Context';
import { AdminProvider } from './context/admin.Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
