import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { SessionContext } from 'contexts/SessionContext';

import './Menu.scss';

const Menu = () => {
  
  let { state, dispatch } = useContext(SessionContext);

  let closeMenu = () => dispatch({
    type: "toggle-menu"
  });

  return (
    <div className="Menu_wrapper">
      <nav className={`menu ${state.menu.open ? 'open': ''}`}>
        <NavLink exact to="/" onClick={()=> closeMenu()}>
          <span role="img" aria-label="dashboard">&#127918;</span>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" onClick={()=> closeMenu()}>
          <span role="img" aria-label="tasks">&#9989;</span>
          Tasks
        </NavLink>
        <NavLink to="/projects" onClick={()=> closeMenu()}>
          <span role="img" aria-label="projects">&#128203;</span>
          Projects
        </NavLink>
        <NavLink to="/settings" onClick={()=> closeMenu()}>
          <span role="img" aria-label="settings">&#128295;</span>
          Settings
        </NavLink>
      </nav>
    </div>

  )
}
export default Menu;