// Widget component - Hydration gauge bar
import React, { useContext, useEffect } from 'react';

// Element components
import Button from 'components/elements/Button/Button';

// Files
import './HydrationGauge.scss';

// Acepts a percent prop value for how filled up the gauge is
// Accepts a flash prop boolean to make the button flash when you need to drink water
// Accepts a resetHydration prop function to restart the timer
// Accepts an alert prop to determine if the button or the guage should show
const HydrationGauge = (props) => {

  return (
    <div className="Hydration_wrapper">
      <h3>Hydration Reminder</h3>
      { !props.alert 
        ? <div className="Hydration-gauge">
            <span style={{width: `${props.percent}%`}}></span>
          </div>
        : <Button
            id="drink-water-btn"
            className={`drink-water-btn ${props.flash ? 'flash' : ''}`}
            type="button"
            name="drink-water-btn"
            text="Drink Water"
            onClick={(e) => {
              props.resetHydration()
            }}
          />
      }

    </div>
  )
};

export default HydrationGauge;