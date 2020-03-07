import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

import Timer from 'components/widgets/Timer/Timer';
import HydrationGauge from 'components/widgets/HydrationGauge/HydrationGauge';

import './Dashboard.scss';

const Dashboard = () => {

  let { state } = useContext(UserContext);

  return (
    <main className="Main_wrapper">
      <div className="Main">
        <p>Welcome {state.name}</p>
        <div className="start-work_wrapper"></div>
        <Timer />
        <p>Testing helper function</p>
        <HydrationGauge />
        <Link to="/whereami">Where Am I?</Link>
      </div>
    </main>
  );

};

export default Dashboard;