import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

import './Projects.scss';

const Projects = () => {

  let { state } = useContext(UserContext);

  return (
    <main className="Main_wrapper">
      <div className="Main">
        <h2>Projects for {state.name}</h2>
      </div>
    </main>
  );

};

export default Projects;