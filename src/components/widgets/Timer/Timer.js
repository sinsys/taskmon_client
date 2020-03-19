import React, { 
  useContext, 
  useEffect 
} from 'react';
import { SessionContext } from 'contexts/SessionContext';

import './Timer.scss';

const Timer = () => {

  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    let updateString = () => sessionContext.dispatch({
      type: "update-string"
    });
    let interval = null;
    if (sessionContext.state.timer.active) {
      interval = setInterval(() => {
        updateString();
      }, 1000);
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionContext.state.active]);

  return (

    <div className="Timer">
      <div className="time">
        <p>Session Time:&nbsp;
          <span>
            {(sessionContext.state.timer.string)
              ? sessionContext.state.timer.string
              : "..."
            }
          </span>
        </p>
      </div>
    </div>
    
  );
};

export default Timer;