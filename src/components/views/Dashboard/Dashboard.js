import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="start-work_wrapper"></div>
      <Timer />
      <HydrationGauge percent={25}/>

      <div class="Tasks-list_wrapper">
        <h2>Tasks</h2>
        <div class="Tasks-list">
          <div class="Task">
            <p>This is a task title</p>
            <span>1d 2hr 48m</span>
          </div>
          <div class="Task">
            <p>This is a task title</p>
            <span>1d 2hr 48m</span>
          </div>
          <div class="Task">
            <p>This is a task title</p>
            <span>1d 2hr 48m</span>
          </div>
        </div>
        <div class="Tasks-view-all-btn">
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