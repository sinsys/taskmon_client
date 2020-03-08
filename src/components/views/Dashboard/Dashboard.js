import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

import Timer from 'components/widgets/Timer/Timer';
import HydrationGauge from 'components/widgets/HydrationGauge/HydrationGauge';

import './Dashboard.scss';

const Dashboard = () => {

  let { state } = useContext(UserContext);

  return (

    <div className="Main Dashboard">
      <h2>{state.name}'s Dashboard</h2>
      <div className="start-work_wrapper"></div>
      <Timer />
      <HydrationGauge percent={25}/>
    </div>
    
  );

};

export default Dashboard;