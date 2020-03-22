// View component - Signup page for non-logged in users
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Services
import TokenService from 'services/token-service';
import SettingsApiService from 'services/settings-service';
import AuthApiService from 'services/auth-api-service';

// Contexts / Hooks
import { UserContext } from 'contexts/UserContext';
import { useInputChange } from 'hooks/useInputChange';

// Element components
import ErrorMsg from 'components/elements/ErrorMsg/ErrorMsg';
import Button from 'components/elements/Button/Button';

// Files
import './Signup.scss';

const Signup = () => {

  const history = useHistory();

  // Initialize our input context
  const [input, handleInputChange] = useInputChange();
  const [errors, setErrors] = useState({});

  let { dispatch } = useContext(UserContext);

  // Using login function if user successfully registers to log the user in
  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

  // Lots of validations. Should be self explanatory
  const validateSignupForm = (e) => {
    e.preventDefault();
    let errors = {};
    if ( input["user_name"] === undefined || input["user_name"] === '' ) {
      errors.user_name = { message: "Email is required" }
    }
    if ( input["password"] === undefined || input["password"] === '' ) {
      errors.password = { message: "Password is required" }
    }
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    if( !REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(input["password"]) ) {
      errors.password = { message: `Requires at least one special character, one uppercase letter, and one number` }
    };
    if( input["password"] !== undefined && input["password"].length < 8 ) {
      errors.password = { message: `Password must be at least 8 characters` }
    }
    if( input["password"] !== input["password-repeat-field"] ) {
      errors["password-repeat-field"] = { message: `Passwords must match` }
    }
    if( input.nickname === undefined || input.nickname === '' ) {
      errors.displayName = { message: 'Display name is required' }
    }

    if ( Object.keys(errors).length !== 0 ) {
      return (
        setErrors(errors)
      );
    } else {
      submitForm();
    }
  };

  // If validation passes, submit the registration
  const submitForm = () => {
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
                // If registration is successful, log the user in and push them to their dashboard
                history.push('/');
                login(res);
              });
          });
      })
      .catch(res => {
        if ( res.error === "Username already taken" ) {
          setErrors( { user_name: { message: res.error } } );
        }
      });
  };
  return (

    <div className="Main">
      <form 
        id="Signup_form"
        className="Signup_form base-form"
        onSubmit={(e) => validateSignupForm(e) }
      >
        <h2 className="Main-heading">Sign Up</h2>
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
        <label htmlFor="password-repeat-field">
          Repeat Password
          { errors["password-repeat-field"] 
            ? <ErrorMsg 
                message={errors["password-repeat-field"].message} 
              />
            : ""
          }
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
          { errors.displayName
            ? <ErrorMsg 
                message={errors.displayName.message} 
              />
            : ""
          }
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