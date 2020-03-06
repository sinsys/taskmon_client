import React from 'react';
import { UserContext } from 'contexts/UserContext/UserContext';
import { TimerContextProvider } from 'contexts/TimerContext/TimerContext';

import Timer from 'components/widgets/Timer/Timer';
import HydrationGauge from 'components/widgets/HydrationGauge/HydrationGauge';

import './Dashboard.scss';

function Dashboard() {

  let { state } = React.useContext(UserContext);

  return (
      <main className="Main_wrapper">
        <div className="Main">
          <p>Welcome {state.name}</p>
          <div className="start-work_wrapper"></div>
          <TimerContextProvider>
            <Timer />
          </TimerContextProvider>

          <HydrationGauge />
        </div>
      </main>

  );

};

export default Dashboard;
