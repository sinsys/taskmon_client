import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import Button from 'components/elements/Button/Button';

import './Tasks.scss';

const Tasks = () => {

  let { state } = useContext(UserContext);

  return (
    <div className="Main Tasks">
      <h2>{state.name}'s Tasks</h2>
      <div className="Tasks_wrapper">
        <h2>Tasks</h2>
        <div className="Tasks">
          <div className="Task-item">

            <div className="Task-summary">
            <h3>This is a task title</h3>
              <p>This is an upcoming task summary. This is an upcoming task summary. This is an upcoming task summary. </p>
            </div>

            <div className="Task-details">
              <p className="Task-project">Project Name</p>
              <p className="Task-due">1d 2hr 48m</p>
            </div>

          </div>

          <div className="Task-item">

            <div className="Task-summary">
            <h3>This is a task title</h3>
              <p>This is an upcoming task summary. This is an upcoming task summary. This is an upcoming task summary. </p>
            </div>

            <div className="Task-details">
              <p className="Task-due">1d 2hr 48m</p>
            </div>

          </div>
          <div className="Task-item">

            <div className="Task-summary">
              <h3>This is a task title</h3>
              <p>This is an upcoming task summary. This is an upcoming task summary. This is an upcoming task summary. </p>
            </div>

            <div className="Task-details">
              <p className="Task-project">Project Name</p>
              <p className="Task-due">1d 2hr 48m</p>
            </div>

          </div>
          <div className="Task-item">

            <div className="Task-summary">
              <h3>This is a task title</h3>
              <p>This is an upcoming task summary. This is an upcoming task summary. This is an upcoming task summary. </p>
            </div>

            <div className="Task-details">
              <p className="Task-project">Project Name</p>
              <p className="Task-due">1d 2hr 48m</p>
            </div>

          </div>
          <div className="Task-item">

            <div className="Task-summary">
              <h3>This is a task title</h3>
              <p>This is an upcoming task summary. This is an upcoming task summary. This is an upcoming task summary. </p>
            </div>

            <div className="Task-details">
              <p className="Task-due">1d 2hr 48m</p>
            </div>

          </div>
        </div>
        <div className="Tasks-view-all-btn">
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

export default Tasks;