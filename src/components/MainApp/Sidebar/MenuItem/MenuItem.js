import React from 'react';
import './MenuItem.scss';

const MenuItem = ({ activator, title, isActive, icon }) => {
  return (
    <div onClick={activator}>
      <div className={`menu-item ${isActive && 'menu-item-active'}`}>
        <span className="menu-item-icon">{icon}</span>
        <span className="menu-item-title">{title}</span>
      </div>
    </div>
  );
};

export default MenuItem;
