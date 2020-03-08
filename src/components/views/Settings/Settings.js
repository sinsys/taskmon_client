import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';
import { UserContext } from 'contexts/UserContext';

import Button from 'components/elements/Button/Button';

import './Settings.scss';

const Settings = () => {

  let { state } = useContext(UserContext);

  const [input, handleInputChange] = useInputChange();

  const history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    const loginCreds = {
      username: input["email-field"],
      password: input["password-field"]
    };
    console.log(`Mock form submission:
    ${JSON.stringify(loginCreds)}`);
  };

  return (

    <div className="Main Settings">
      <h2>Settings</h2>
      <form 
        id="Settings_form"
        className="Settings_form base-form"
        onSubmit={(e) => submitForm(e)}
      >
        <h2 className="Main-heading">
          {`${state.name}'s Settings`}
        </h2>
        <label htmlFor="email-field">
          Display Name
        </label>
        <input 
          type="text" 
          id="name-field" 
          name="name-field"  
          defaultValue={state.name}
          onChange={handleInputChange}
        />
        <div class="form-checkbox-wrapper">
          <input 
            type="checkbox" 
            id="hydration-toggle" 
            name="hydration-toggle" 
            onChange={handleInputChange}
            defaultChecked={state.hydration
              ? "checked"
              : ""
            }
          />
          <label htmlFor="hydration-toggle">
            Show Hydration Gauge
          </label>

        </div>

        <Button
          id="submit-settings-btn"
          className="submit-btn"
          type="submit"
          name="submit-settings-btn"
          form="Settings_form"
          text="Save Settings"
        />
        <Button
          id="create-acct-btn"
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

export default Settings;