import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';

import Button from 'components/elements/Button/Button';

import { updateTimeStrings } from 'helpers/helpers';

import './Tasks.scss';

const Tasks = () => {

  let userContext = useContext(UserContext);
  let itemsContext = useContext(ItemsContext);
  
  const history = useHistory();

  useEffect(() => {

    let timer = null;

    if ( itemsContext.state.fetched ) {

      itemsContext.dispatch({
        type: 'set-tasks',
        payload: updateTimeStrings(itemsContext.state.tasks)
      });
  
      timer = setInterval(() => {
        itemsContext.dispatch({
          type: 'set-tasks',
          payload: updateTimeStrings(itemsContext.state.tasks)
        });
      }, 1000);
      
    }
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);
  
  return (
    <div className="Main Tasks">
      <h2>{userContext.state.nickname}'s Tasks</h2>
      <div className="Tasks_wrapper">
        <div className="Tasks-header">
          <h2>Tasks</h2>
          <Button
            id="add-btn"
            className="add-item-btn"
            type="button"
            name="add-btn"
            text="+ New"
            onClick={(e) => {
              history.push('/tasks/add')
            }}
          />
        </div>
        <div className="Tasks">
          { itemsContext.state.tasks
            .map((item) => {
              return (
                <div 
                  className={`Task-item ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
                  key={`${item.id}-${item.type}`}
                  onClick={() => {
                    history.push(`/tasks/${item.id}`);
                  }}
                >
                  <div className="Task-summary">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
      
                  <div className="Task-details">
                    { (item.project_id !== null) 
                      ? <p className="Task-project">
                          {item.project_name}
                        </p>
                      : ""
                    }
                    <p 
                      className={`Task-due ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
                    >
                      {item.completed
                        ? "Completed"
                        : item.date_due_string
                      }
                    </p>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );

};

export default Tasks;