import React from 'react';

import './HydrationGauge.scss';

const HydrationGauge = (props) => {
  return (
    <div className="Hydration-gauge">
      <span style={{width: `${props.percent}%`}}></span>
    </div>
  )
};

export default HydrationGauge;