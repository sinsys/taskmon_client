import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

import './Header.scss';

function Header() {

  let { state, dispatch } = useContext(UserContext);

  let logout = () => dispatch({
    type: "logout"
  });

  return (

    <header 
      className={`Header_wrapper ${!state.isLoggedIn ? "launch" : ""}`}
    >
      <div className="Header">
        <Link 
          to="/"
          onClick={(e) => logout()}
        >
          <img src="https://dummyimage.com/64/FFFFFF/000.png&text=Logo" alt="logo" />
        </Link>
        <h1>TaskMon</h1>
        {state.isLoggedIn
          ? <div href="#" className="box-shadow-menu"></div>
          : ""
        }
      </div>
    </header>

  );

};

export default Header;