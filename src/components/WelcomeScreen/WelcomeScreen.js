import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import './WelcomeScreen.scss';
import Profile from '../auth0/Profile';
import LoginButton from '../auth0/LoginButton';
import LogoutButton from '../auth0/LogoutButton';

const WelcomeScreen = () => {
  const myRef = useRef(null);
  const vantaRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (myRef.current) {
      observer.observe(myRef.current);
    }

    return () => {
      if (myRef.current) {
        observer.unobserve(myRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !vantaRef.current && myRef.current) {
      vantaRef.current = CLOUDS({
        el: myRef.current,
        THREE: THREE,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, [isVisible]);

  return <div className='welcomeScreen__animatedBackground' ref={myRef} style={{
    
  }}>
    <div className='menu'>
      <div className='logo'>application</div>
      <div className='welcome'>
        Hello
      </div>
      <div className='avatar' />


      <div className='userEmail'>
        <Profile />
      </div>
      
      
      
      <div className='loginButtons'>
        <LoginButton />
        <LogoutButton />
      </div>
    </div>


  </div>;
};

export default WelcomeScreen;