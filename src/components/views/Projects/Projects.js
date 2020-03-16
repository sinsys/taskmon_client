import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';

import { getTimeString } from 'helpers/helpers';

import './Projects.scss';

const Projects = () => {

  let userContext = useContext(UserContext);
  let itemsContext = useContext(ItemsContext);
  
  let [items, setItems] = useState([]);

  useEffect(() => {

    const constructItems = (arr) => {
      return arr.map((item => {

        return { 
          ...item,
          date_due_string: getTimeString("until", new Date(item.date_due)),
          task_count: (itemsContext.state.tasks.filter((task => {
            return task.project_id === item.id
          })).length !== 0)
            ? itemsContext.state.tasks.filter((task => {
                return task.project_id === item.id
              })).length
            : 0
        }
      }))
    };

    setItems(
      constructItems(itemsContext.state.projects)
    );

    let timer = null;
    timer = setInterval(() => {
      setItems(
        constructItems(itemsContext.state.projects)
      );
    }, 1000);
    
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="Main">
      <h2>{userContext.state.name}'s Tasks</h2>
      <div className="Projects_wrapper">
        <h2>Projects</h2>
        <div className="Projects">
        { items
            .map((item) => {
              return (
                <div 
                  className={`Task-item ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
                  key={`${item.id}-${item.type}`}
                >
                  <div className="Task-summary">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
      
                  <div className="Task-details">
                    { (item.task_count !== 0) 
                      ? <p className="Task-project">
                          {`${item.task_count} ${(item.task_count === 1) ? 'task' : 'tasks'}`}
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

export default Projects;