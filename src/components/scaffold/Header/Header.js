import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {

  return (

    <header className="Header_wrapper launch">
      <div className="Header">
        <Link to="/">
          <img src="https://dummyimage.com/64/FFFFFF/000.png&text=Logo" alt="logo" />
        </Link>
        <h1>TaskMon</h1>
      </div>
    </header>

  );

};

export default Header;