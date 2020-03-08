import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';

import Button from 'components/elements/Button/Button';

import './ProjectForm.scss';

const ProjectForm = () => {

  const history = useHistory();

  const [input, handleInputChange] = useInputChange();

  const submitForm = (e) => {
    e.preventDefault();
    const loginCreds = {
      // username: input["email-field"],
      // password: input["password-field"],
      // additionalField: input["additional-field"]
    };
    console.log(`Mock form submission:
    ${JSON.stringify(loginCreds)}`);
  };

  return (

    <div className="Main">
      <form 
        id="Project_form"
        className="Project_form base-form"
        onSubmit={(e) => submitForm(e) }
      >
        <h2 className="Main-heading">Project</h2>
        <label htmlFor="title-field">
          Title
        </label>
        <input 
          type="text" 
          id="title-field" 
          name="title-field"  
          onChange={handleInputChange}
        />
        <label htmlFor="desc-field">
          Description
        </label>
        <textarea
          id="desc-field" 
          name="desc-field" 
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="additional-field">
          Additional Fields...
        </label>
        <input 
          type="text" 
          id="additional-field" 
          name="additional-field" 
          onChange={handleInputChange}
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