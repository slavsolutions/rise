import React, {useEffect, useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import './MainApp.scss';
import Sidebar from './Sidebar/Sidebar';
import Header from './Content/Header/Header';
import Assets from './Content/Assets/AssetsView/AssetsView';
import Dashboard from './Content/Dashboard/Dashboard';
import Footer from './Content/Footer/Footer';
import AppSettings from './Content/Settings/AppSettings';
import Users from './Content/Users/Users';

const viewComponents = {
  Assets,
  Dashboard,
  AppSettings,
  Users
  // Dodaj tutaj inne komponenty widoków
};

const MainApp = () => {
  const {isAuthenticated} = useAuth0();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState(<Dashboard />);

  const changeView = (newView) => {
    const Component = viewComponents[newView];
    if (Component) {
      setCurrentView(<Component />);
    } else {
      console.error(`Component ${newView} not found`);
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="main_wrapper">
      <Sidebar changeView={changeView}/>
      <div className='main_content'>
        <Header />
        <div className='dynamic_changed_content'>
          {currentView}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainApp;
