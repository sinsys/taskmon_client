// Widget component - Hamburger Menu icon
import React, { useContext } from 'react';

// Contexts
import { SessionContext } from 'contexts/SessionContext';

// Files
import './Burger.scss';

const Burger = () => {

  // Using the session context to control menu state
  const { state, dispatch } = useContext(SessionContext);

  // Open or close the menu
  let toggleMenu = () => dispatch({
    type: "toggle-menu"
  });

  return (

    <div 
      className="burger" 
      open={false}
      onClick={(e) => {
        toggleMenu();
      }}
    >
      <div className={`row ${state.menu.open ? 'open': ''}`}/>
      <div className={`row ${state.menu.open ? 'open': ''}`}/>
      <div className={`row ${state.menu.open ? 'open': ''}`}/>
    </div>

  );

};

export default Burger;