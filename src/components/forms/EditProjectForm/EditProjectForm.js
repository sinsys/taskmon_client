// View Component - Editing a project
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Services
import ProjectsApiService from 'services/projects-service';

// Contexts / Hooks
import { ItemsContext } from 'contexts/ItemsContext';
import { useInputChange } from 'hooks/useInputChange';


// Element Components
import ErrorMsg from 'components/elements/ErrorMsg/ErrorMsg';
import Button from 'components/elements/Button/Button';
import { DateTimePicker } from '@material-ui/pickers';

// Files
import './EditProjectForm.scss';

const EditProjectForm = (props) => {

  const history = useHistory();

  const itemsContext = useContext(ItemsContext);

  // Finds project from our items context based on route projectId
  let contextProject = itemsContext.state.projects.find(project => {
    let projectIdInt = parseInt(props.projectId);
    return project.id === projectIdInt;
  });

  // Initializes our input context on existing values of the selected project
  const [input, handleInputChange] = useInputChange({
    ...contextProject
  });

  // material-ui state - Handles the DateTimePicker component's value
  const [selectedDate, handleDateChange] = useState(new Date());
  const [errors, setErrors] = useState({});

  useEffect(() => {

    // Initializes the datepicker on the selected project
    // Only does this if the data has been fetched already
    if ( itemsContext.state.fetched ) {
      handleDateChange(new Date(input["date_due"]))
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  // Validates the form to ensure it includes a title
  const validateProjectForm = (e) => {
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
    const projectProperties = {
      title: input["title"],
      content: input["content"],
      date_due: selectedDate
    };

    ProjectsApiService.updateProject(props.projectId, projectProperties)
      .then(res => {
        // Triggers a refetch of our projects/items to avoid manual state changes
        itemsContext.dispatch({
          type: 'refetch'
        });
        history.push(`/projects/${props.projectId}`);
      });
  };

  return (

    <div className="Main">
      <form 
        id="Project_form"
        className="Project_form base-form"
        onSubmit={(e) => validateProjectForm(e) }
      >
        <h2 className="Main-heading">Edit Project</h2>
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
          id="submit-project-btn"
          className="submit-btn"
          type="submit"
          name="submit-btn"
          form="Project_form"
          text="Submit"
        />
        <Button
          id="cancel-btn"
          className="cancel-btn"
          type="button"
          name="cancel-btn"
          text="Cancel"
          onClick={(e) => {
            history.push(`/projects/${props.projectId}`);
          }}
        />
      </form>
    </div>

  );

};

export default EditProjectForm;