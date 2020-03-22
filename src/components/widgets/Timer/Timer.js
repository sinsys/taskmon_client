// Widget component - Session Timer
import React, { 
  useContext, 
  useEffect 
} from 'react';

// Contexts
import { SessionContext } from 'contexts/SessionContext';

// Files
import './Timer.scss';

const Timer = () => {

  // Starts a timer to record the users session
  // This timer runs in the background indefinitely since the page was open, whether the user was logged in or not
  // The timer will stop when the tab/window is closed.
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