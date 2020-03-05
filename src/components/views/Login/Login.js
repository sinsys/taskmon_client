import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../scaffold/Header/Header';
import Footer from '../../scaffold/Footer/Footer';

import Button from '../../elements/Button/Button';

import './Login.scss';

function Login() {
  const history = useHistory();
    return (

      <>
        <Header />
        <main className="Main_wrapper launch">
          <div className="Main">
            <form 
              className="Login_form base-form"
              onSubmit={(e) => e.preventDefault() }
            >
              <h2 className="Main-heading">Log In</h2>
              <label htmlFor="email-field">
                Email
              </label>
              <input type="email" id="email-field" name="email-field"  autoComplete="email" />
              <label htmlFor="password-field">
                Password
              </label>
              <input type="password" id="password-field" name="password-field" autoComplete="current-password" />
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
