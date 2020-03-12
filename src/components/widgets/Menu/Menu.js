import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { faChalkboardTeacher, faCheckSquare, faProjectDiagram, faCogs, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UserContext } from 'contexts/UserContext';
import { SessionContext } from 'contexts/SessionContext';

import './Menu.scss';

const Menu = () => {
  
  let userContext = useContext(UserContext);
  let { state, dispatch } = useContext(SessionContext);


  let closeMenu = () => dispatch({
    type: "toggle-menu"
  });

  let logOut = () => userContext.dispatch({
    type: "logout"
  });

  return (
    <div className="Menu_wrapper">
      <nav className={`menu ${state.menu.open ? 'open': ''}`}>
        <NavLink exact to="/" onClick={()=> closeMenu()}>
          <span role="img" aria-label="dashboard">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </span>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" onClick={()=> closeMenu()}>
          <span role="img" aria-label="tasks">
            <FontAwesomeIcon icon={faCheckSquare} />
          </span>
          Tasks
        </NavLink>
        <NavLink to="/projects" onClick={()=> closeMenu()}>
          <span role="img" aria-label="projects">
            <FontAwesomeIcon icon={faProjectDiagram} />
          </span>
          Projects
        </NavLink>
        <NavLink to="/settings" onClick={()=> closeMenu()}>
          <span role="img" aria-label="settings">
            <FontAwesomeIcon icon={faCogs} />
          </span>
          Settings
        </NavLink>
        <hr />
        <Link to="/" onClick={() => {
          closeMenu();
          logOut();
        }}>
          <span role="img" aria-label="logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
          Log Out
        </Link>
      </nav>
    </div>

  )
}
export default Menu;