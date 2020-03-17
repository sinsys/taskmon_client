import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';
import { UserContext } from 'contexts/UserContext';

import SettingsApiService from 'services/settings-service';
import Button from 'components/elements/Button/Button';

import './Settings.scss';

const Settings = () => {

  let { state, dispatch } = useContext(UserContext);

  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });
  
  const [input, handleInputChange] = useInputChange();

  const history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    const settings = {};
    if ( input["nickname-field"] !== undefined ) {
      settings.nickname = input["nickname-field"]
    };
    if ( input["hydration-checkbox"] !== undefined ) {
      settings.hydration = input["hydration-checkbox"]
    };
    SettingsApiService.updateSettings(settings)
      .then(res => {
        SettingsApiService.getSettings()
          .then(res => {
            login(res);
          });
      });
  };

  return (

    <div className="Main Settings">
      <form 
        id="Settings_form"
        className="Settings_form base-form"
        onSubmit={(e) => submitForm(e)}
      >
        <h2 className="Main-heading">
          {`${state.nickname}'s Settings`}
        </h2>
        <label htmlFor="nickname-field">
          Display Name
        </label>
        <input 
          type="text" 
          id="nickname-field" 
          name="nickname-field"  
          defaultValue={state.nickname}
          onChange={handleInputChange}
        />
        <div className="form-checkbox-wrapper">
          <input 
            type="checkbox" 
            id="hydration-checkbox" 
            name="hydration-checkbox" 
            onClick={handleInputChange}
            defaultChecked={state.hydration}
          />
          <label htmlFor="hydration-checkbox">
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