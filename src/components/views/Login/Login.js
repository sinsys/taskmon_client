import React from 'react';
// import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputChange } from 'hooks/useInputChange';
// import UserContext from 'contexts/UserContext/UserContext';

import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';

import Button from 'components/elements/Button/Button';

import './Login.scss';

function Login() {

  // const user = useContext(UserContext);
  // console.log(`Logged In: ${user.isLoggedIn}`);

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

    <>
      <Header />
      <main className="Main_wrapper launch">
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
            />
          </form>
        </div>
      </main>
      <Footer />
    </>

  );

};

export default Login;
