import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './components/MainApp/MainApp';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SystemReadyGate from './components/gates/SystemReadyGate';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientid = process.env.REACT_APP_AUTH0_CLIENTID;

const TokenLogger = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthenticated)
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        dispatch({
          type: 'DATA_UPDATE',
          data: 'jwt',
          payload: token,
        });
        //localStorage.setItem('jwt', token);
      } catch (e) {
        loginWithRedirect()
        console.error('Błąd pobierania tokena:', e.message);
      }
    };
    if (isAuthenticated) {
      fetchToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, dispatch]);
  return null;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientid}
        authorizationParams={{ redirect_uri: window.location.origin }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <Router>
          <TokenLogger />
          <SystemReadyGate>
            <Routes>
              <Route exact path="/" element={<App />} />
              <Route exact path="/main" element={<MainApp />} />
            </Routes>
          </SystemReadyGate>
        </Router>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
