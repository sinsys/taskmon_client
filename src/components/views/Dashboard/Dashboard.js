import React from 'react';
import { UserContext } from 'contexts/UserContext/UserContext';

import Button from 'components/elements/Button/Button';
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
          <Button
            id="submit-login-btn"
            className="start-work-btn"
            type="button"
            name="start-work-btn"
            text="Start work"
          />
          <Timer 
            time="asdkjasdl"
          />
          <HydrationGauge />
        </div>
      </main>

  );

};

export default Dashboard;
