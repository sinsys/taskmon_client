// View component - Root page for logged in users
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Contexts
import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';
import { SessionContext } from 'contexts/SessionContext';

// Helpers
import { updateTimeStrings } from 'helpers/helpers';

// Widget Components
import Timer from 'components/widgets/Timer/Timer';
import HydrationGauge from 'components/widgets/HydrationGauge/HydrationGauge';

// Element components
import Button from 'components/elements/Button/Button';

// Files
import './Dashboard.scss';

const Dashboard = () => {

  let userContext = useContext(UserContext);
  let itemsContext = useContext(ItemsContext);
  let sessionContext = useContext(SessionContext);

  const history = useHistory();

  // Resets the hydation bar when the interval is up
  let resetHydration = () => sessionContext.dispatch({
    type: 'reset-hydration'
  });

  useEffect(() => {
    let timer = null;

    // Hydration bar handling
    let difference = new Date().getTime() - sessionContext.state.hydration.start;
    let ceiling = sessionContext.state.hydration.interval;
    let percent = 100 - (difference / ceiling * 100);

    // Set initial hydration percent based on session timer
    sessionContext.dispatch({
      type: 'set-hydration',
      payload: percent
    });

    // Set items if the items are fetched to update time strings
    if ( itemsContext.state.fetched ) {
      itemsContext.dispatch({
        type: 'set-all',
        payload: updateTimeStrings(itemsContext.state.all)
      });
  
      // Update the time strings every second
      timer = setInterval(() => {

        // Hydration bar handling
        let difference = new Date().getTime() - sessionContext.state.hydration.start;
        let ceiling = sessionContext.state.hydration.interval;
        let percent = 100 - (difference / ceiling * 100);

        // Update percent state if it hasn't reached 0
        if ( percent > 0 ) {
          // Set hydration percent every second
          sessionContext.dispatch({
            type: 'set-hydration',
            payload: percent
          });
        }

        // Handle when the timer is up and display the button
        // Enable the flash toggling
        if ( percent <= 0 ) {
          sessionContext.dispatch({
            type: 'set-hydration-alert'
          });
          sessionContext.dispatch({
            type: 'toggle-flash'
          });
        }

        // Update task and project due date strings
        itemsContext.dispatch({
          type: 'set-all',
          payload: updateTimeStrings(itemsContext.state.all)
        });

      }, 1000);
      
    }
    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched, sessionContext.state.hydration.alert]);

  return (
    <div className="Main Dashboard">
      <h2>{userContext.state.nickname}'s Dashboard</h2>
      <Timer />
      {userContext.state.hydration
        ? <HydrationGauge 
            percent={sessionContext.state.hydration.percent}
            alert={sessionContext.state.hydration.alert}
            resetHydration={resetHydration}
            flash={sessionContext.state.hydration.flash}
          />
        : ''
      }
      <div className="Upcoming_wrapper">
        <h2>Upcoming</h2>
        <div className="Upcoming">
          { itemsContext.state.all.length === 0
            ? <div className="empty-state">
                <p>You have no upcoming tasks or projects</p>
              </div>
            : ""
          }
          { itemsContext.state.all
            .map((item) => {
              return (
                <div 
                  className={`Upcoming-item ${item.date_due_string === 'Past due' ? 'past-due' : ''}`} 
                  key={`${item.id}-${item.type}`}
                  onClick={() => {
                    history.push(`/${item.type}/${item.id}`)
                  }}
                >
                  <div className="Upcoming-summary">
                    <span className="Upcoming-title">{item.title}</span>
                    <span className={`Upcoming-type ${item.type}`}>{item.type}</span>
                  </div>
                  <div className="Upcoming-details">
                    <p 
                      className={`Upcoming-due ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
                    >
                      {item.completed
                        ? "Completed"
                        : item.date_due_string
                      }
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="Dashboard-btns_wrapper">
        <Button
          id="add-project-btn"
          className="dashboard-add-item-btn"
          type="button"
          name="add-project"
          text="+ Add Project"
          onClick={(e) => {
            history.push(`/projects/add`);
          }}
        />
        <Button
            id="add-task-btn"
            className="dashboard-add-item-btn"
            type="button"
            name="add-task"
            text="+ Add Task"
            onClick={(e) => {
              history.push(`/tasks/add`);
            }}
          />
      </div>

    </div>
    
  );

};

export default Dashboard;