import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';
import { UserContext } from 'contexts/UserContext';
import TokenService from 'services/token-service';
import AuthApiService from 'services/auth-api-service';

import Button from 'components/elements/Button/Button';

import './Login.scss';

const Login = () => {

  let { dispatch } = useContext(UserContext);

  let login = (name) => dispatch({
    type: "login",
    data: name
  });

  const history = useHistory();

  const [input, handleInputChange] = useInputChange();
  const submitJwtAuth = (e) => {
    e.preventDefault();
    const loginCreds = {
      user_name: input["email-field"],
      password: input["password-field"]
    };
    AuthApiService.postLogin({
      user_name: loginCreds.user_name,
      password: loginCreds.password
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        const userName = (loginCreds.user_name === undefined)
          ? "Guest user"
          : loginCreds.user_name;
        loginCreds.user_name = '';
        loginCreds.password = '';
        login(userName);
        
      })
      .catch(res => {
      
      })
  }


  return (

    <div className="Main">
      <form 
        id="Login_form"
        className="Login_form base-form"
        onSubmit={(e) => submitJwtAuth(e)}
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
            submitJwtAuth(e)
          }}
        />
      </form>
    </div>
    
  );

};

export default Login;