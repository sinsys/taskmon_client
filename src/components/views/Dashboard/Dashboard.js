import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

import Timer from 'components/widgets/Timer/Timer';
import HydrationGauge from 'components/widgets/HydrationGauge/HydrationGauge';
import Button from 'components/elements/Button/Button';
import './Dashboard.scss';

const Dashboard = () => {

  let { state } = useContext(UserContext);

  return (
    <div className="Main Dashboard">
      <h2>{state.name}'s Dashboard</h2>
      <Timer />
      <HydrationGauge percent={25}/>

      <div className="Upcoming_wrapper">
        <h2>Upcoming</h2>
        <div className="Upcoming">
          <div className="Upcoming-item">

            <div className="Upcoming-summary">
              <p>This is an upcoming task title</p>
            </div>
            
            <div className="Upcoming-details">
              <p className="Upcoming-type">Task</p>
              <p className="Upcoming-due">1d 2hr 48m</p>
            </div>

          </div>
          <div className="Upcoming-item">

            <div className="Upcoming-summary">
              <p>This is an upcoming project title</p>
            </div>
            
            <div className="Upcoming-details">
              <p className="Upcoming-type">Project</p>
              <p className="Upcoming-due">2d 12hr 1m</p>
            </div>

          </div>
          <div className="Upcoming-item">

            <div className="Upcoming-summary">
              <p>This is an upcoming project title</p>
            </div>
            
            <div className="Upcoming-details">
              <p className="Upcoming-type">Task</p>
              <p className="Upcoming-due">1w 2d 4hr 42m</p>
            </div>

          </div>
        </div>
        <div className="Tasks-view-all-btn">
          <Button
            id="view-all"
            className="view-all-btn"
            type="button"
            name="view-all"
            text="View all"
          />
        </div>
      </div>
    </div>
    
  );

};

export default Dashboard;