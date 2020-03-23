// View component - Root page for logged in users
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Services
import AuthApiService from 'services/auth-api-service';
import TokenService from 'services/token-service';
import SettingsApiService from 'services/settings-service';

// Contexts
import { UserContext } from 'contexts/UserContext';

// Element Components
import Button from 'components/elements/Button/Button';

// Files / Icons
import { faClock, faProjectDiagram, faStopwatch, faTint, faSignInAlt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Landing.scss';

const Landing = () => {

  let { dispatch } = useContext(UserContext);

  // Logs the user in and sets their settings to the session
  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

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
            history.push('/');
          })
      })
      .catch(res => {
        console.log('Something went wrong');
      })
  }

  const history = useHistory();

  return (
    <div className="Main Landing">
      <div className="Landing_wrapper">
        <h2>Welcome to TaskMon!</h2>
        <div className="Landing-description">
          <p>This is a task manager application intended to provide a sense of urgency on projects. Instead of displaying the traditional due date of a project or task, this application displays a constant countdown timer showing you how much time you have left to complete the project or task.</p>
          <p>It also records how long you are working and provides a helpful "hydration meter" ensuring you're drinking enough water while you bash away on your projects!</p>
        </div>
        <div className="Landing-features">
          <h2>
            Features
          </h2>
          <ul className="Landing-features-list"> 
            <li>
              <span role="img" aria-label="custom-due-dates">
                <FontAwesomeIcon icon={faClock} />
              </span>
              Custom Due Dates
            </li>
            <li>
              <span role="img" aria-label="project-task-linking">
                <FontAwesomeIcon icon={faProjectDiagram} />
              </span>
              Project/Task Linking
            </li>
            <li>
              <span role="img" aria-label="session-timer">
                <FontAwesomeIcon icon={faStopwatch} />
              </span>
              Session Timer
            </li>
            <li>
              <span role="img" aria-label="hydration-meter">
                <FontAwesomeIcon icon={faTint} />
              </span>
              Hydration Meter
            </li>
          </ul>
        </div>
        <div className="Landing-features">
          <h2>
            Usage
          </h2>
          <div className="Landing-usage-item">
            <h3>
              <span role="img" aria-label="logging-in">
                <FontAwesomeIcon icon={faSignInAlt} />
              </span>
              Logging In
            </h3>
            <p>
              You are welcome to create your own account to start with a blank slate. There is a Demo Account button available to skip the registration process and to simply log into a public account.
            </p>
            <p>
              It is suggested to create your own account to get a fresh experience.
            </p>
            <blockquote className="disclaimer">The demo account is uncontrolled and public. It may be being used by multiple people. Use with caution.</blockquote>
          </div>
          <div className="Landing-usage-item">
            <h3>
              <span role="img" aria-label="adding-projects-tasks">
                <FontAwesomeIcon icon={faTasks} />
              </span>
              Adding Projects/Tasks
            </h3>
            <p>
              You can add a Project or Task from either the main Dashboard page or from the Projects/Tasks pages. You must supply a title for your Project or Task.
            </p>
            <p>The Project/Task's due date defaults to the moment you loaded the page. Alter the due date to the future to avoid immediately having your Project/Task be overdue</p>
            <blockquote className="disclaimer">Tasks are unique in that you can select an existing Project that they belong to!</blockquote>
          </div>
          <div className="Landing-usage-item">
            <h3>
              <span role="img" aria-label="session-timer">
                <FontAwesomeIcon icon={faStopwatch} />
              </span>
              Session Timer
            </h3>
            <p>
              Whenever the page is launched, you have a timer recording your session. It will keep recording your session as long as you're actively at TaskMon. It will keep the timer in the background if you keep the tab open.
            </p>
            <blockquote className="disclaimer">The session timer will only reset if you manually refresh the page or leave TaskMon. Your session timer will stay persistent on multiple logins as long as the page is up!</blockquote>
          </div>
          <div className="Landing-usage-item">
            <h3>
              <span role="img" aria-label="hydration-meter">
                <FontAwesomeIcon icon={faTint} />
              </span>
              Hydration Meter
            </h3>
            <p>
              This meter listens to the Session timer's count and will remind you to periodically drink water. Hard workers often drink lots of coffee or energy drinks in lieu of water.
            </p>
            <p>Once you have been active for 2 hours it will display a flashing button reminding you to drink some H20! This is also a great time to take a break and refresh your mental state.</p>
            <blockquote className="disclaimer">You can disable your hydration gauge on the Settings page.</blockquote>
          </div>
        </div>
        <div className="Landing-features summary">
          <h2>
            Let's Go!
          </h2>
          <p>This should be enough enough to get you going with TaskMon. We hope you enjoy your experience!</p>
          <Button
            id="login-btn"
            className="submit-btn"
            type="button"
            name="login-btn"
            text="Login"
            onClick={() => {
              history.push('/login')
            }}
          />
          <Button
            id="create-acct-btn"
            className="create-acct-btn"
            type="button"
            name="create-acct-btn"
            text="Create account"
            onClick={() => {
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
        </div>
      </div>
    </div>
  );

};

export default Landing;