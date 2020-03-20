import React, { useState, useContext, useEffect } from 'react';

import TasksApiService from 'services/tasks-service';
import Button from 'components/elements/Button/Button';

import { useHistory } from 'react-router-dom';
import { ItemsContext } from 'contexts/ItemsContext';

import { getTimeString } from 'helpers/helpers';

import './Task.scss';

const Task = (props) => {

  let [task, setTask] = useState({});
  let itemsContext = useContext(ItemsContext);

  let history = useHistory();

  useEffect(() => {

    let timer = null;

    const updateTimeString = (task) => {
      return { 
        ...task,
        date_due_string: getTimeString("until", new Date(task.date_due))
      }
    };

    if ( itemsContext.state.fetched ) {
      let task = 
        itemsContext.state.tasks.find(task => {
          let taskIdInt = parseInt(props.taskId);
          return task.id === taskIdInt;
        });
      setTask(updateTimeString(task))
      timer = setInterval(() => {
        setTask(updateTimeString(task));
      }, 1000);
    }

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  const markTaskComplete = (taskId) => {
    let markCompleted = { completed: true };
    TasksApiService.updateTask(taskId, markCompleted)
      .then(res => {
        itemsContext.dispatch({
          type: 'refetch'
        });
      });
  };

  const markTaskIncomplete = (taskId) => {
    let markCompleted = { completed: false };
    TasksApiService.updateTask(taskId, markCompleted)
      .then(res => {
        itemsContext.dispatch({
          type: 'refetch'
        });
      });
  };

  const deleteTask = (taskId) => {
    if (window.confirm(`Are you sure you want to delete ${task.title}`) ) {
      TasksApiService.deleteTask(taskId)
        .then(res => {
          itemsContext.dispatch({
            type: 'refetch'
          });
          history.push('/tasks');
        })
    }
  };

  return (

    <div className="Main Task">
      <div className="task-heading">
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
        className={`Task-item ${task.date_due_string === 'Past due' ? 'past-due' : ''}`}
        key={`${task.id}-${task.type}`}
      >
        <div className="Task-summary">
          <h3>{task.title}</h3>
          <p>{task.content}</p>
        </div>

        <div className="Task-details">
          { (task.project_id !== null) 
            ? <p className="Task-project">
                {task.project_name}
              </p>
            : ""
          }
          <p 
            className={`Task-due ${task.date_due_string === 'Past due' ? 'past-due' : ''}`}
          >
            {task.completed
              ? "Completed"
              : task.date_due_string
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
            onClick={(e) => deleteTask(task.id)}
          />
        <Button
            id="edit-btn"
            className="edit-btn"
            type="button"
            name="edit-btn"
            text="Edit"
            onClick={(e) => {
              history.push(`/tasks/${task.id}/edit`);
            }}
          />
          <Button
            id="complete-btn"
            className={`${!task.completed ? 'complete-btn' : 'incomplete-btn'}`}
            type="button"
            name="complete-btn"
            text={
              task.completed
                ? "Incomplete"
                : "Complete"
            }
            onClick={(e) => {
              task.completed
                ? markTaskIncomplete(task.id)
                : markTaskComplete(task.id);
            }}
          />
      </div>
    </div>
    
  );

};

export default Task;