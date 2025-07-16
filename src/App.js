import React, { useEffect } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import axiosRequests from './functions/axios-requests/assets';
import axiosRequestsUsers from "./functions/axios-requests/users";

function App() {
  useEffect(() => {
    axiosRequests.getAssetTypes()
    axiosRequests.getAssetBrandList()
    axiosRequests.getAssetModels()
    axiosRequestsUsers.getUsersList()
  }, []);
  return (
    <div className="App">
      <WelcomeScreen />
    </div>
  );
}

export default App;
