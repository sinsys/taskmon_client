import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import Button from 'components/elements/Button/Button';

import './Projects.scss';

const Projects = () => {

  let { state } = useContext(UserContext);

  return (

    <div className="Main">
      <h2>Projects for {state.name}</h2>
      <div className="Projects_wrapper">
        <h2>Projects</h2>
        <div className="Projects">
          <div className="Project-item">

            <div className="Project-summary">
            <h3>This is a Project title</h3>
              <p>This is an upcoming Project summary. This is an upcoming Project summary. This is an upcoming Project summary. </p>
            </div>

            <div className="Project-details">
              <p className="Project-project">3 Tasks</p>
              <p className="Project-due">1d 2hr 48m</p>
            </div>

          </div>

          <div className="Project-item">

            <div className="Project-summary">
            <h3>This is a Project title</h3>
              <p>This is an upcoming Project summary. This is an upcoming Project summary. This is an upcoming Project summary. </p>
            </div>

            <div className="Project-details">
              <p className="Project-due">1d 2hr 48m</p>
            </div>

          </div>
        </div>
        <div className="Projects-view-all-btn">
          <Button
            id="view-more"
            className="view-all-btn"
            type="button"
            name="view-more"
            text="View More"
          />
        </div>
      </div>
    </div>
    
  );

};

export default Projects;