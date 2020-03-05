import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import config from './config.js';

import Login from './components/views/Login/Login';
import Signup from './components/views/Signup/Signup';

import './App.scss';

class App extends Component {

  state = {

  };

  render() {
    return (
      <div className="Taskmon">
        <header class="Header_wrapper launch">
          <div class="Header">
            <Link to="/">
              <img src="https://dummyimage.com/64/FFFFFF/000.png&text=Logo" alt="logo" />
            </Link>
            <h1>TaskMon</h1>
          </div>
        </header>

        <main class="Main_wrapper launch">
          <div class="Main">
            <form class="Login_form base-form">
              <h2 class="Main-heading">Log In</h2>
              <label for="email-field">
                Email
              </label>
              <input type="email" id="email-field" name="email-field"  autocomplete="email" />
              <label for="password-field">
                Password
              </label>
              <input type="password" id="password-field" name="password-field" autocomplete="current-password" />
              <button type="submit" form="Login_form" id="login-submit-btn" name="login-submit-btn" value="Login">
                Login
              </button>
              <button id="create-account-btn" name="create-account-btn" value="Create Account">
                Create Account
              </button>
              <button id="login-guest-btn" name="login-guest-btn" value="Log in as Guest">
                Log in as Guest
              </button>
            </form>
          </div>
        </main>

        <footer class="Footer_wrapper">
          <div class="Footer">
            <p>Footer information here</p>
          </div>
        </footer>
        <Route
          path={'/login'}
          key={'/'}
          component={Login}
        />
        <Route
          path={'/signup'}
          key={'/'}
          component={Signup}
        />
      </div>

    );
  };

};

export default App;
