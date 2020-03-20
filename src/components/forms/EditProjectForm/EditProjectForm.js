import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ProjectsApiService from 'services/projects-service';

import { useInputChange } from 'hooks/useInputChange';
import { DateTimePicker } from '@material-ui/pickers';

import { ItemsContext } from 'contexts/ItemsContext';

import Button from 'components/elements/Button/Button';

import './EditProjectForm.scss';

const EditProjectForm = (props) => {

  const history = useHistory();

  const itemsContext = useContext(ItemsContext);

  let contextProject = itemsContext.state.projects.find(project => {
    let projectIdInt = parseInt(props.projectId);
    return project.id === projectIdInt;
  });

  const [input, handleInputChange] = useInputChange({
    ...contextProject
  });

  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {

    if ( itemsContext.state.fetched ) {
      handleDateChange(new Date(input["date_due"]))
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  const submitForm = (e) => {
    e.preventDefault();
    const projectProperties = {
      title: input["title"],
      content: input["content"],
      date_due: selectedDate
    };

    ProjectsApiService.updateProject(props.projectId, projectProperties)
      .then(res => {
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
        onSubmit={(e) => submitForm(e) }
      >
        <h2 className="Main-heading">Edit Project</h2>
        <label htmlFor="title-field">
          Title
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
            history.push('/')
          }}
        />
      </form>
    </div>

  );

};

export default EditProjectForm;