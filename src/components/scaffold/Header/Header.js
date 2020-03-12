import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';

import Burger from 'components/widgets/Burger/Burger';

import { UserContext } from 'contexts/UserContext';

import './Header.scss';

const Header = () => {

  let userContext = useContext(UserContext);

  return (

    <header 
      className={`Header_wrapper ${!userContext.state.isLoggedIn ? "launch" : ""}`}
    >
      <div className="Header">
        <Link 
          to="/"
        >
          <img src={logo} alt="logo" />
        </Link>
        <h1>TaskMon</h1>
        {userContext.state.isLoggedIn
          ? <Burger/>
          : ''
        }
      </div>
    </header>

  );

};

export default Header;