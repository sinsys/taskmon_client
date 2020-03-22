// View component - Root page for non logged in users
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Services
import TokenService from 'services/token-service';
import AuthApiService from 'services/auth-api-service';
import SettingsApiService from 'services/settings-service';

// Contexts / Hooks
import { UserContext } from 'contexts/UserContext';
import { useInputChange } from 'hooks/useInputChange';

// Element components
import Button from 'components/elements/Button/Button';
import ErrorMsg from 'components/elements/ErrorMsg/ErrorMsg';

// Files
import './Login.scss';

const Login = () => {

  let { dispatch } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  // Logs the user in and sets their settings to the session
  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

  const history = useHistory();

  // Initializes our input context
  const [input, handleInputChange] = useInputChange();

  // Validates the form to ensure it includes a username and password
  const validateLoginForm = (e) => {
    e.preventDefault();
    let errors = {};
    if ( input["user_name"] === undefined || input["user_name"] === '' ) {
      errors.user_name = { message: "Email is required" }
    }
    if ( input["password"] === undefined || input["password"] === '' ) {
      errors.password = { message: "Password is required" }
    }

    if ( Object.keys(errors).length !== 0 ) {
      return (
        setErrors(errors)
      );
    } else {
      submitJwtAuth();
    }
  };

  // Submits form if credentials are provided
  const submitJwtAuth = () => {
    const loginCreds = {
      user_name: input["user_name"],
      password: input["password"]
    };
    AuthApiService.postLogin({
      user_name: loginCreds.user_name,
      password: loginCreds.password
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        loginCreds.user_name = '';
        loginCreds.password = '';
        SettingsApiService.getSettings()
          .then(res => {
            login(res);
          })
      })
      .catch(res => {
        // Update our error text on user_name if a server error
        // Common example would be "Username already exists"
        setErrors( { user_name: { message: res.error } } );
      });
  }

  // Logs user in with default credentials. It is a public account and credentials do not need to be secured
  const guestLogin = (e) => {
    e.preventDefault();
    const loginCreds = {
      user_name: "dunder@dunder.com",
      password: "password"
    };

    AuthApiService.postLogin({
      user_name: loginCreds.user_name,
      password: loginCreds.password
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        loginCreds.user_name = '';
        loginCreds.password = '';
        SettingsApiService.getSettings()
          .then(res => {
            login(res);
          })
      })
      .catch(res => {
        console.log('Something went wrong');
      })
  }

  return (

    <div className="Main">
      <form 
        id="Login_form"
        className="Login_form base-form"
        onSubmit={(e) => validateLoginForm(e)}
      >
        <h2 className="Main-heading">
          Log In
        </h2>
        <label htmlFor="email-field">
          Email
          { errors.user_name 
            ? <ErrorMsg 
                message={errors.user_name.message} 
              />
            : ""
          }
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
          { errors.password
            ? <ErrorMsg 
                message={errors.password.message} 
              />
            : ""
          }
        </label>
        <input 
          type="password" 
          id="password-field" 
          name="password" 
          autoComplete="current-password" 
          onChange={handleInputChange}
        />
        <Button
          id="submit-login-btn"
          className="submit-btn"
          type="submit"
          name="submit-btn"
          form="Login_form"
          text="Login"
        />
        <Button
          id="create-acct-btn"
          className="create-acct-btn"
          type="button"
          name="create-acct-btn"
          text="Create account"
          onClick={(e) => {
            history.push('/signup')
          }}
        />
        <Button
          id="guest-login-btn"
          className="guest-login-btn"
          type="button"
          name="guest-login-btn"
          text="Demo Account"
          onClick={(e) => {
            guestLogin(e)
          }}
        />
      </form>
    </div>
    
  );

};

export default Login;