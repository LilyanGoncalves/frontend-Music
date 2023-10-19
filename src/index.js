import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('inicialização da aplicação');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


