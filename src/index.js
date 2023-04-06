import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { CommentContextProvider } from './context/CommentContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <CommentContextProvider>
          <BrowserRouter >
            <App />
          </BrowserRouter>
        </CommentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


