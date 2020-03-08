import React, { useContext } from 'react';

import { SessionContext } from 'contexts/SessionContext';

import './Burger.scss';

const Burger = () => {

  const { state, dispatch } = useContext(SessionContext);

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