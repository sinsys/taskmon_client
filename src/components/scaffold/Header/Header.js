// Scaffolding Component - Header
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { UserContext } from 'contexts/UserContext';

// Widget Components
import Burger from 'components/widgets/Burger/Burger';

// Files / Images
import logo from 'assets/images/logo.svg';
import './Header.scss';

const Header = () => {

  let userContext = useContext(UserContext);

  // Toggles header style if user is logged in or not
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