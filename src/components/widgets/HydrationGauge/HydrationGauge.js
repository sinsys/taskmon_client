import React from 'react';

import './HydrationGauge.scss';

const HydrationGauge = (props) => {
  return (
    <div className="Hydration_wrapper">
      <h3>Hydration Reminder</h3>
      <div className="Hydration-gauge">
        <span style={{width: `${props.percent}%`}}></span>
      </div>
    </div>
  )
};

export default HydrationGauge;