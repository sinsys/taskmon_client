// View component - Individual project page
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Services
import ProjectsApiService from 'services/projects-service';

// Contexts
import { ItemsContext } from 'contexts/ItemsContext';

// Helpers
import { getTimeString } from 'helpers/helpers';

// Element components
import Button from 'components/elements/Button/Button';

// Files
import './Project.scss';

const Project = (props) => {

  // We set our own state object here to avoid calling complex logic on the itemsContext.projects array
  let [project, setProject] = useState({});
  let itemsContext = useContext(ItemsContext);

  let history = useHistory();

  useEffect(() => {

    let timer = null;


    const updateTimeStrings = (item) => {
      // Update some additional properties we'll need that context doesn't provide
      if (item.hasOwnProperty('tasks') && item.tasks.length > 0){
        // We map twice - Once to update the project time string, and once to update it's tasks time strings
        return {
          ...item,
          date_due_string: getTimeString("until", new Date(item.date_due)),
          tasks: item.tasks.map(task => {
            return {
              ...task,
              date_due_string: getTimeString("until", new Date(task.date_due)) 
            }
          })
        }
      } else {
        // We do not map the tasks if the project has none
        return { 
          ...item,
          date_due_string: getTimeString("until", new Date(item.date_due))
        }
      }
    };
    // Set the project if the project is fetched
    if ( itemsContext.state.fetched ) {
      // Get our project from context
      let project = 
        itemsContext.state.projects.find(project => {
          let projectIdInt = parseInt(props.projectId);
          return project.id === projectIdInt;
        });
      // Set the project to local state
      setProject(updateTimeStrings(project));
      // Start a timer to update time strings every second
      timer = setInterval(() => {
        setProject(updateTimeStrings(project));
      }, 1000);
    }

    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  // Marks a project as complete
  const markProjectComplete = (projectId) => {
    let markCompleted = { completed: true };
    ProjectsApiService.updateProject(projectId, markCompleted)
      .then(res => {
        itemsContext.dispatch({
          type: 'refetch'
        });
      });
  };

  // Marks the project as incomplete
  const markProjectIncomplete = (projectId) => {
    let markCompleted = { completed: false };
    ProjectsApiService.updateProject(projectId, markCompleted)
      .then(res => {
        itemsContext.dispatch({
          type: 'refetch'
        });
      });
  };

  // Deletes the project
  const deleteProject = (projectId) => {
    if (window.confirm(`Are you sure you want to delete ${project.title}`) ) {
      ProjectsApiService.deleteProject(projectId)
        .then(res => {
          itemsContext.dispatch({
            type: 'refetch'
          });
          history.push('/projects');
        })
    }
  };

  // Lots of conditional rendering here. Potential area to clean up during another refactor
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
          onClick={(e) => {
            history.push(`/projects/${project.id}/edit`);
          }}
        />
        <Button
          id="complete-btn"
          className={`${!project.completed ? 'complete-btn' : 'incomplete-btn'}`}
          type="button"
          name="complete-btn"
          text={
            project.completed
              ? "Incomplete"
              : "Complete"
          }
          onClick={(e) => {
            project.completed
              ? markProjectIncomplete(project.id)
              : markProjectComplete(project.id);
          }}
        />
      </div>
      { project.tasks !== undefined && project.tasks.length > 0
        ? <div className="Project-tasks_wrapper">
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
            <div className="Upcoming">
              <div className="Project-tasks">
                { project.tasks.map(item => {
                  return (
                    <div 
                      className={`Upcoming-item ${item.date_due_string === 'Past due' ? 'past-due' : ''}`} 
                      key={`${item.id}-${item.type}`}
                      onClick={() => {
                        history.push(`/tasks/${item.id}`)
                      }}
                    >
                      <div className="Upcoming-summary">
                        <span className="Upcoming-title">{item.title}</span>
                        <span className={`Upcoming-type ${item.type}`}>{item.type}</span>
                      </div>
                      <div className="Upcoming-details">
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
                })}
              </div>
            </div>
          </div>
        : ""
      }
    </div>
  );

};

export default Project;