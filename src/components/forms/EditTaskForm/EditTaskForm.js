// View Component - Editing a task
import React, { useEffect, useState, useContext } from 'react';
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
import './EditTaskForm.scss';

const EditTaskForm = (props) => {

  const history = useHistory();

  const itemsContext = useContext(ItemsContext);

  // Finds the task information we are editing
  let contextTask = itemsContext.state.tasks.find(task => {
    let taskIdInt = parseInt(props.taskId);
    return task.id === taskIdInt;
  }) || { project_id: null };

  // Initializes our input context on existing values of the selected task
  const [input, handleInputChange] = useInputChange({
    ...contextTask,
    "project-checkbox": (contextTask.project_id != null)
  });

  // material-ui state - Handles the DateTimePicker component's value
  const [selectedDate, handleDateChange] = useState(new Date());
  const [errors, setErrors] = useState({});

  useEffect(() => {

    // Initializes the datepicker on the selected task
    // Only does this if the data has been fetched already
    if ( itemsContext.state.fetched ) {
      handleDateChange(new Date(input["date_due"]))
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

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
  const submitForm = () => {
    const taskProperties = {
      title: input["title"],
      content: input["content"],
      date_due: selectedDate
    };
    // Verifies that if a project was selected, it actually has a reasonable value to use
    if ( 
      input["project-checkbox"] && 
      input["project_id"] !== undefined &&
      input["project_id"] !== "-- No project --"
    ) {
      taskProperties.project_id = parseInt(input["project_id"]);
    }
    TasksApiService.updateTask(props.taskId, taskProperties)
      .then(res => {
        // Triggers a refetch of our projects/items to avoid manual state changes
        itemsContext.dispatch({
          type: 'refetch'
        });
        history.push(`/tasks/${props.taskId}`);
      });
  };

  return (

    <div className="Main">
      <form 
        id="Task_form"
        className="Task_form base-form"
        onSubmit={(e) => validateTaskForm(e) }
      >
        <h2 className="Main-heading">Edit Task</h2>
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
          value={input["title"]}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="desc-field">
          Description
        </label>
        <textarea
          id="desc-field" 
          name="content" 
          value={input["content"]}
          onChange={handleInputChange}
        ></textarea>

        <label htmlFor="project-select">
        Project:
          <Checkbox 
            name="project-checkbox"
            checked={input["project-checkbox"]}
            onChange={handleInputChange}
          />          
        </label>
        
        <select
          name="project_id"
          value={input["project_id"] || ""}
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
            history.push(`/tasks/${props.taskId}`);
          }}
        />
      </form>
    </div>

  );

};

export default EditTaskForm;