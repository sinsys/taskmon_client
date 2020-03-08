import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';
import { UserContext } from 'contexts/UserContext';

import Button from 'components/elements/Button/Button';

import './Login.scss';

const Login = () => {

  let { dispatch } = useContext(UserContext);

  let login = () => dispatch({
    type: "login"
  });

  const history = useHistory();

  const [input, handleInputChange] = useInputChange();

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

    <div className="Main">
      <form 
        id="Login_form"
        className="Login_form base-form"
        onSubmit={(e) => submitForm(e)}
      >
        <h2 className="Main-heading">
          Log In
        </h2>
        <label htmlFor="email-field">
          Email
        </label>
        <input 
          type="email" 
          id="email-field" 
          name="email-field"  
          autoComplete="email" 
          onChange={handleInputChange}
        />
        <label htmlFor="password-field">
          Password
        </label>
        <input 
          type="password" 
          id="password-field" 
          name="password-field" 
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
          onClick={(e) => {
            login();
          }}
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
          text="Log in as guest"
          onClick={(e) => {
            login();
          }}
        />
      </form>
    </div>
    
  );

};

export default Login;