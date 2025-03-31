import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainApp from './components/MainApp/MainApp';
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import axiosRequests from './functions/axios-requests/assets';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientid = process.env.REACT_APP_AUTH0_CLIENTID



console.log(domain, clientid)
console.log('uwaga url ', window.location.origin+"/main")

root.render(
  <React.StrictMode>
    <Router>
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{redirect_uri: window.location.origin}}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      >
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<App />} />
          <Route exact path='/main' element={<MainApp />} />
        </Routes>      
      </Provider>
    </Auth0Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//Auth0Provider domain={domain} clientId={clientid} authorizationParams={{redirect_uri: window.location.origin}}>