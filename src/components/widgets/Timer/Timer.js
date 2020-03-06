import React from 'react';
import { TimerContext } from 'contexts/TimerContext/TimerContext';

import Button from 'components/elements/Button/Button';

import './Timer.scss';

const Timer = () => {

  // const [seconds, setSeconds] = useState(0);
  const { state, dispatch } = React.useContext(TimerContext);

  // const [isActive, setIsActive] = React.useState(false);



  let toggle = () => dispatch({
    type: "toggle"
  });

  React.useEffect(() => {
    let increment = () => dispatch({
      type: "increment"
    });
    let interval = null;
    if (state.active) {
      interval = setInterval(() => {
        increment();
      }, 1000);
    } else if (!state.active && state.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state, dispatch]);

  return (
    <div className="Timer">
      <div className="time">
        <p>{`${state.seconds} seconds`}</p>
      </div>
      <div className="row">
        <Button
          id="submit-login-btn"
          className={`button button-primary button-primary-${state.active ? 'active' : 'inactive'}`}
          type="button"
          name="start-work-btn"
          text={state.active ? 'Pause' : 'Start'}
          onClick={() => toggle()}
        />
      </div>
    </div>
  );
};

export default Timer;