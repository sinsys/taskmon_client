import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';

import { UserContext } from 'contexts/UserContext';
import TokenService from 'services/token-service';
import SettingsApiService from 'services/settings-service';
import AuthApiService from 'services/auth-api-service';

import Button from 'components/elements/Button/Button';

import './Signup.scss';

const Signup = () => {

  const history = useHistory();

  const [input, handleInputChange] = useInputChange();

  let { dispatch } = useContext(UserContext);
  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

  const submitForm = (e) => {
    e.preventDefault();
    const registrationCreds = {
      user_name: input["user_name"],
      password: input["password"],
      nickname: input["nickname"]
    };
    AuthApiService.postUser(registrationCreds)
      .then(res => {
        AuthApiService.postLogin({
          user_name: registrationCreds.user_name,
          password: registrationCreds.password
        })
          .then(res => {
            TokenService.saveAuthToken(res.authToken);
            SettingsApiService.getSettings()
              .then(res => {
                history.push('/');
                login(res);
              });
          });
      })
      .catch(res => {
        console.log('Something went wrong');
      });
  };
  return (

    <div className="Main">
      <form 
        id="Signup_form"
        className="Signup_form base-form"
        onSubmit={(e) => submitForm(e) }
      >
        <h2 className="Main-heading">Sign Up</h2>
        <label htmlFor="email-field">
          Email
        </label>
        <input 
          type="email" 
          id="email-field" 
          name="user_name" 
          autoComplete="email" 
          onChange={handleInputChange}
        />
        <label htmlFor="password-field">
          Password
        </label>
        <input 
          type="password" 
          id="password-field" 
          name="password" 
          autoComplete="current-password" 
          onChange={handleInputChange}
        />
        <label htmlFor="password-repeat-field">
          Repeat Password
        </label>
        <input 
          type="password" 
          id="password-repeat-field" 
          name="password-repeat-field" 
          autoComplete="current-password" 
          onChange={handleInputChange}
        />
        <label htmlFor="display-name">
          Display Name
        </label>
        <input 
          type="text" 
          id="display-name" 
          name="nickname" 
          onChange={handleInputChange}
        />
        <Button
          id="submit-signup-btn"
          className="submit-btn"
          type="submit"
          name="submit-btn"
          form="Signup_form"
          text="Sign Up"
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

export default Signup;