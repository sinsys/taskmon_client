import React, { useContext, useEffect } from 'react';

import Button from 'components/elements/Button/Button';

import { useHistory } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';

import { updateTimeStrings } from 'helpers/helpers';

import './Projects.scss';

const Projects = () => {

  let userContext = useContext(UserContext);
  let itemsContext = useContext(ItemsContext);
  
  const history = useHistory();

  useEffect(() => {

    let timer = null;

    if ( itemsContext.state.fetched ) {

      itemsContext.dispatch({
        type: 'set-projects',
        payload: updateTimeStrings(itemsContext.state.projects)
      });
  
      
      timer = setInterval(() => {
        itemsContext.dispatch({
          type: 'set-projects',
          payload: updateTimeStrings(itemsContext.state.projects)
        });
      }, 1000);
      
    }
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  return (

    <div className="Main Projects">
      <h2>{userContext.state.nickname}'s Projects</h2>
      <div className="Projects_wrapper">
        <div className="Projects-header">
          <h2>Projects</h2>
          <Button
            id="add-btn"
            className="add-item-btn"
            type="button"
            name="add-btn"
            text="+ New"
            onClick={(e) => {
              history.push('/projects/add')
            }}
          />
        </div>
        <div className="Projects">
        { itemsContext.state.projects.length === 0
            ? <div className="empty-state">
                <p>You have no upcoming projects</p>
              </div>
            : ""
        }
        { itemsContext.state.projects
            .map((item) => {
              return (
                <div 
                  className={`Project-item ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
                  key={`${item.id}-${item.type}`}
                  onClick={() => {
                    history.push(`/${item.type}/${item.id}`)
                  }}
                >
                  <div className="Project-summary">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
      
                  <div className="Project-details">
                    { (item.task_count !== 0) 
                      ? <p className="Project-project">
                          {`${item.task_count} ${(item.task_count === 1) ? 'task' : 'tasks'}`}
                        </p>
                      : ""
                    }
                    <p 
                      className={`Project-due ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
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
    </div>
    
  );

};

export default Projects;