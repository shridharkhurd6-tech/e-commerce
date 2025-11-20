import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import './indexx.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import "./Components/styles/amazon-theme.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);

// ✅ Optional: Measure app performance (analytics or logs)
reportWebVitals(console.log);

