// Widget component - Hydration gauge bar
import React from 'react';

// Files
import './HydrationGauge.scss';

// Acepts a props.percent value for how filled up the gauge is
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