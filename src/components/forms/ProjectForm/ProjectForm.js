import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ProjectsApiService from 'services/projects-service';

import { useInputChange } from 'hooks/useInputChange';
import { DateTimePicker } from '@material-ui/pickers';

import { ItemsContext } from 'contexts/ItemsContext';

import Button from 'components/elements/Button/Button';

import './ProjectForm.scss';


const ProjectForm = () => {

  const history = useHistory();

  const itemsContext = useContext(ItemsContext);
  const [input, handleInputChange] = useInputChange();
  const [selectedDate, handleDateChange] = useState(new Date());

  const submitForm = (e) => {
    e.preventDefault();
    const projectProperties = {
      ...input,
      date_due: selectedDate
    };
    ProjectsApiService.addProject(projectProperties)
      .then(res => {
        itemsContext.dispatch({
          type: 'refetch'
        });
        history.goBack();
      });
  };

  return (

    <div className="Main">
      <form 
        id="Project_form"
        className="Project_form base-form"
        onSubmit={(e) => submitForm(e) }
      >
        <h2 className="Main-heading">New Project</h2>
        <label htmlFor="title-field">
          Title
        </label>
        <input 
          type="text" 
          id="title-field" 
          name="title"  
          onChange={handleInputChange}
          required
        />
        <label htmlFor="desc-field">
          Description
        </label>
        <textarea
          id="desc-field" 
          name="content" 
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

export default ProjectForm;