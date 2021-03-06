// View Component - Adding a task
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Services
import TasksApiService from 'services/tasks-service';

// Contexts / Hooks
import { ItemsContext } from 'contexts/ItemsContext';
import { useInputChange } from 'hooks/useInputChange';

// Element components
import ErrorMsg from 'components/elements/ErrorMsg/ErrorMsg';
import Button from 'components/elements/Button/Button';
import { Checkbox } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

// Files
import './TaskForm.scss';

const TaskForm = () => {

  const history = useHistory();

  const itemsContext = useContext(ItemsContext);

    // Initializes our input context
  const [input, handleInputChange] = useInputChange();

  // material-ui state - Handles the DateTimePicker component's value
  const [selectedDate, handleDateChange] = useState(new Date());
  const [errors, setErrors] = useState({});

  // Validates the form to ensure it includes a title
  const validateTaskForm = (e) => {
    e.preventDefault();
    let errors = {};
    if ( input.title === undefined || input.title === '' ) {
      errors.title = { message: "Title is required" }
    }
    if ( Object.keys(errors).length !== 0 ) {
      return (
        setErrors(errors)
      );
    } else {
      submitForm();
    }
  };

  // Submits the form if validation passes
  const submitForm = (e) => {
    const taskProperties = {
      title: input["title"],
      content: input["content"],
      date_due: selectedDate
    };
    if ( 
      input["project-checkbox"] && 
      input["project_id"] !== undefined &&
      input["project_id"] !== "-- No project --"
    ) {
      taskProperties.project_id = parseInt(input["project_id"]);
    }
    TasksApiService.addTask(taskProperties)
      .then(res => {
        // Triggers a refetch of our projects/items to avoid manual state changes
        itemsContext.dispatch({
          type: 'refetch'
        });
        history.push('/tasks');
      });
  };

  return (

    <div className="Main">
      <form 
        id="Task_form"
        className="Task_form base-form"
        onSubmit={(e) => validateTaskForm(e) }
      >
        <h2 className="Main-heading">New Task</h2>
        <label htmlFor="title-field">
          Title
          { errors.title
            ? <ErrorMsg 
                message={errors.title.message} 
              />
            : ""
          }
        </label>
        <input 
          type="text" 
          id="title-field" 
          name="title"  
          onChange={handleInputChange}
        />
        <label htmlFor="desc-field">
          Description
        </label>
        <textarea
          id="desc-field" 
          name="content" 
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="project-select">
        Project:
          <Checkbox 
            name="project-checkbox"
            onChange={handleInputChange}
          />          
        </label>
        
        <select
          name="project_id"
          onChange={handleInputChange}
          disabled={!input["project-checkbox"]}
        >
          <option value="-- No project --">
            -- No project --
          </option>
          { itemsContext.state.projects.map(project => {
            return (
              <option
                key={project.id}
                value={project.id}
              >
                {project.title}
              </option>
            );
          })}
        </select>
        <label htmlFor="date-due-picker">
          Date Due: 
        </label>
        <DateTimePicker
          id="date-due-picker"
          inputVariant="standard"
          value={selectedDate}
          onChange={handleDateChange}
          InputProps={{
            disableUnderline: true,
           }}
          required
        />
        <Button
          id="submit-task-btn"
          className="submit-btn"
          type="submit"
          name="submit-btn"
          form="Task_form"
          text="Submit"
        />
        <Button
          id="cancel-btn"
          className="cancel-btn"
          type="button"
          name="cancel-btn"
          text="Cancel"
          onClick={(e) => {
            history.push('/')
          }}
        />
      </form>
    </div>

  );

};

export default TaskForm;