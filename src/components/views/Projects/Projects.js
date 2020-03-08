import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

import './Projects.scss';

const Projects = () => {

  let { state } = useContext(UserContext);

  return (

    <div className="Main">
      <h2>Projects for {state.name}</h2>
    </div>
    
  );

};

export default Projects;