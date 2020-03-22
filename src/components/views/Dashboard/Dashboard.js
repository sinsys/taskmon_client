// View component - Root page for logged in users
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Contexts
import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';

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
  
  const history = useHistory();

  useEffect(() => {
    let timer = null;
    // Set items if the items are fetched to update time strings
    if ( itemsContext.state.fetched ) {
      itemsContext.dispatch({
        type: 'set-all',
        payload: updateTimeStrings(itemsContext.state.all)
      });
  
      // Update the time strings every second
      timer = setInterval(() => {
        itemsContext.dispatch({
          type: 'set-all',
          payload: updateTimeStrings(itemsContext.state.all)
        });
      }, 1000);
      
    }
    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  return (
    <div className="Main Dashboard">
      <h2>{userContext.state.nickname}'s Dashboard</h2>
      <Timer />
      {userContext.state.hydration
        ? <HydrationGauge percent={25}/>
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