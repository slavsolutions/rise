import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import './App.css';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import {Provider} from 'react-redux';
import store from './store'
import axiosRequests from './functions/axios-requests/assets';

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    axiosRequests.getAssetTypes()
  }, []);


  return (
    <div className="App">
      <WelcomeScreen />
    </div>
  );
}

export default App;
