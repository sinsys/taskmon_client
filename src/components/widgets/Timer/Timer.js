import React, { 
  useContext, 
  useEffect 
} from 'react';
import { SessionContext } from 'contexts/SessionContext';

import './Timer.scss';

const Timer = () => {

  const { state, dispatch } = useContext(SessionContext);

  useEffect(() => {
    let updateString = () => dispatch({
      type: "update-string"
    });
    let interval = null;
    if (state.timer.active) {
      interval = setInterval(() => {
        updateString();
      }, 1000);
    } else if (!state.timer.active) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state, dispatch]);

  return (

    <div className="Timer">
      <div className="time">
        <p>Session Time:&nbsp;
          <span>
            {(state.timer.string)
              ? state.timer.string
              : "..."
            }
          </span>
        </p>
      </div>
    </div>
    
  );
};

export default Timer;