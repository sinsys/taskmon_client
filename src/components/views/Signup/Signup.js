import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../scaffold/Header/Header';
import Footer from '../../scaffold/Footer/Footer';

import Button from '../../elements/Button/Button';

import './Signup.scss';

function Signup() {
  const history = useHistory();
    return (

      <>
        <Header />
        <main className="Main_wrapper launch">
          <div className="Main">
            <form 
              className="Signup_form base-form"
              onSubmit={(e) => e.preventDefault() }
            >
              <h2 className="Main-heading">Sign Up</h2>
              <label htmlFor="email-field">
                Email
              </label>
              <input type="email" id="email-field" name="email-field"  autoComplete="email" />
              <label htmlFor="password-field">
                Password
              </label>
              <input type="password" id="password-field" name="password-field" autoComplete="current-password" />
              <label htmlFor="password-repeat-field">
                Repeat Password
              </label>
              <input type="password" id="password-repeat-field" name="password-repeat-field" autoComplete="current-password" />
              <label htmlFor="additional-field">
                Additional Fields...
              </label>
              <input type="text" id="additional-field" name="additional-field" />
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
        </main>
        <Footer />
      </>

    );

};

export default Signup;
