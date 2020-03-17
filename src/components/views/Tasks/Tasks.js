import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';

import { getTimeString } from 'helpers/helpers';

import './Tasks.scss';

const Tasks = () => {

  let userContext = useContext(UserContext);
  let itemsContext = useContext(ItemsContext);
  
  let [items, setItems] = useState([]);

  const history = useHistory();
  
  useEffect(() => {

    const constructItems = (arr) => {
      return arr.map((item => {
        return { 
          ...item,
          date_due_string: getTimeString("until", new Date(item.date_due)),
          project_name: (item.project_id)
            ? itemsContext.state.projects.find(p => p.id === item.project_id).title
            : null
        }
      }))
    };

    setItems(
      constructItems(itemsContext.state.tasks)
    );

    let timer = null;
    timer = setInterval(() => {
      setItems(
        constructItems(itemsContext.state.tasks)
      );
    }, 1000);
    
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);
  
  return (
    <div className="Main Tasks">
      <h2>{userContext.state.nickname}'s Tasks</h2>
      <div className="Tasks_wrapper">
        <h2>Tasks</h2>
        <div className="Tasks">
          { items
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
                      {item.date_due_string}</p>
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