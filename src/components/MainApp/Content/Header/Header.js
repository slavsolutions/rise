import React from 'react'
import './Header.scss'
import LogoutButton from '../../../auth0/LogoutButton'
import User from '../../../auth0/User'
import Profile from '../../../auth0/Profile'

const Header = () => {
  return (
    <div className='header__wrapper'>
      <div className='header__logo__wrapper'>
        <div className='header__logo'>RISE</div>
        <div className='header__logo logo__author'>Resource and Issue Service Environment</div>
      </div>
      <div className='header__username'>
          <User />
          <div className='username__arrowdown' />
      </div>
    </div>
  )
}

export default Header
