import React, { useState, useContext, useEffect } from 'react';

import ProjectsApiService from 'services/projects-service';
import Button from 'components/elements/Button/Button';

import { useHistory } from 'react-router-dom';
import { ItemsContext } from 'contexts/ItemsContext';

import { getTimeString } from 'helpers/helpers';

import './Project.scss';

const Task = (props) => {

  let [project, setProject] = useState({});
  let itemsContext = useContext(ItemsContext);

  let history = useHistory();

  useEffect(() => {

    let timer = null;

    const updateTimeString = (item) => {
      return { 
        ...item,
        date_due_string: getTimeString("until", new Date(item.date_due))
      }
    };

    if ( itemsContext.state.fetched ) {
      let project = 
        itemsContext.state.projects.find(project => {
          let projectIdInt = parseInt(props.projectId);
          return project.id === projectIdInt;
        });
      setProject(updateTimeString(project))
      timer = setInterval(() => {
        setProject(updateTimeString(project));
      }, 1000);
    }

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  const markProjectComplete = (projectId) => {
    let markCompleted = { completed: true };
    ProjectsApiService.updateProject(projectId, markCompleted)
      .then(res => {
        itemsContext.dispatch({
          type: 'refetch'
        });
        history.goBack()
      });
  };

  const deleteProject = (projectId) => {
    if (window.confirm(`Are you sure you want to delete ${project.title}`) ) {
      ProjectsApiService.deleteProject(projectId)
        .then(res => {
          itemsContext.dispatch({
            type: 'refetch'
          });
          history.goBack();
        })
    }
  };

  return (

    <div className="Main Project">
      <div className="project-heading">
        <Button
          id="back-btn"
          className="back-btn"
          type="button"
          name="back-btn"
          text="Go Back"
          onClick={(e) => {
            history.goBack()
          }}
        />
      </div>
        <div 
          className={`Project-item ${project.date_due_string === 'Past due' ? 'past-due' : ''}`}
          key={`${project.id}-${project.type}`}
        >
          <div className="Project-summary">
            <h3>{project.title}</h3>
            <p>{project.content}</p>
          </div>

          <div className="Project-details">
            { (project.task_count !== 0) 
              ? <p className="Project-project">
                  {`${project.task_count} ${(project.task_count === 1) ? 'task' : 'tasks'}`}
                </p>
              : ""
            }
            <p 
              className={`Project-due ${project.date_due_string === 'Past due' ? 'past-due' : ''}`}
            >
              {project.completed
                ? "Completed"
                : project.date_due_string
              }
            </p>
          </div>
        </div>
      <div className="task-options">
        <Button
            id="delete-btn"
            className="delete-btn"
            type="button"
            name="delete-btn"
            text="Delete"
            onClick={(e) => deleteProject(project.id)}
          />
        <Button
            id="edit-btn"
            className="edit-btn"
            type="button"
            name="edit-btn"
            text="Edit"
          />
          <Button
            id="complete-btn"
            className="complete-btn"
            type="button"
            name="complete-btn"
            text="Complete"
            onClick={(e) => markProjectComplete(project.id)}
          />
      </div>
    </div>
    
  );

};

export default Task;