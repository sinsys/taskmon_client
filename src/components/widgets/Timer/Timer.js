import React, { 
  useContext, 
  useEffect 
} from 'react';
import { SessionContext } from 'contexts/SessionContext';

import Button from 'components/elements/Button/Button';

import './Timer.scss';

const Timer = () => {

  const { state, dispatch } = useContext(SessionContext);

  let start = () => dispatch({
    type: "start"
  });

  let stop = () => dispatch({
    type: "stop"
  });

  useEffect(() => {
    let updateString = () => dispatch({
      type: "update-string"
    });
    let interval = null;
    if (state.active) {
      interval = setInterval(() => {
        updateString();
      }, 1000);
    } else if (!state.active && state.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state, dispatch]);

  return (

    <div className="Timer">
      <div className="time">
        {state.string}
      </div>
      <div className="row">
        <Button
          id="submit-login-btn"
          className={`button button-primary button-primary-${state.active ? 'active' : 'inactive'}`}
          type="button"
          name="start-work-btn"
          text={state.active ? 'End Session' : 'Start Session'}
          onClick={state.active
            ? () => stop()
            : () => start()
          }
        />
      </div>
    </div>
    
  );
};

export default Timer;