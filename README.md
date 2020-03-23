# TaskMon - Task Monitor

## Description

This is a task manager application intended to provide a sense of urgency on projects. Instead of displaying the traditional due date of a project or task, this application displays a constant countdown timer showing you how much time you have left to complete the task.

It also records how long you are working and provides a helpful "hydration meter" ensuring you're drinking enough water while you bash away on your projects!

## Live Site
[TaskMon](https://taskmon.now.sh)

## Table of contents

*  [Technologies](#technologies)
*  [Planning](#planning)
*  [Screenshots](#screenshots)
*  [Requirements](#requirements)
*  [Available Scripts](#available-scripts)

## Technologies
| Language | Framework/Library | Version |
| :--- | :---: | ---: |
| **HTML 5** | *n/a* | *n/a* |
| **CSS 3** | *n/a* | *n/a* |
| **JS ES6** | **React** | *16.13* |
| | **Node** | *12.16* |
| | **Express** | *4.17.1* |
| **pgSQL** | **PostgreSQL** | *10.12* |

## Planning
- Gantt Chart for progress tracking: [Gantt Chart](https://docs.google.com/spreadsheets/d/1gs3NtOi0saVZm1x91WcbMBz3AyNKN3RqGG2ubOGZn8Q/edit#gid=2140549662?usp=sharing)
- User Stories for use-cases: [User Stories](https://docs.google.com/spreadsheets/d/1gs3NtOi0saVZm1x91WcbMBz3AyNKN3RqGG2ubOGZn8Q/edit#gid=739121299?usp=sharing)
- Wireframes: [Wireframes Navigator](https://sinsys.github.io/taskmon_client/wireframes/html/index.html)
- User Flows: [User Flows on Draw.io](https://drive.google.com/file/d/1Z--cjFDzV-dabEC5hAtgKheW9UV70B5F/view?usp=sharing)

## Screenshots
- Login Page:
  - ![Login Page](https://raw.githubusercontent.com/sinsys/taskmon_client/master/screenshots/login.jpg)
- Dashboard Page:
  - ![Dashboard Page](https://raw.githubusercontent.com/sinsys/taskmon_client/master/screenshots/dashboard.jpg)
- Project Page:
  - ![Project Page](https://raw.githubusercontent.com/sinsys/taskmon_client/master/screenshots/project.jpg)
- Project w/ Overdue Task:
  - ![Project w/ Overdue Task](https://raw.githubusercontent.com/sinsys/taskmon_client/master/screenshots/project-tasks-overdue.jpg)

## Requirements

- Your app must do something interesting or useful
- Your app must be a fullstack app using React, CSS, Node, Express, and PostgreSQL.
- The client and API should be deployed separately and stored in separate GitHub repos.
- Both client- and server-side code must be tested.
- At a minimum, you should test the happy path for each endpoint in your API and include a smoke test for each component in your React client. If time permits, include tests for the unhappy paths for each endpoint and add snapshot tests for your client where appropriate.
- Your app must be responsive and work just as well on mobile devices as it does on desktop devices.
- All code must be high quality, error-free, commented as necessary, and clean. When a hiring manager looks at your code, you want them to think, "This person has great coding habits". There should be no errors in the console.
- The styling on your client must be polished. That means choosing fonts and colors that make sense, correctly sizing different components, and ensuring that it looks great on both mobile and desktop devices.
- The content of your app must be clear and readable.
- You **must** use vanilla CSS for styling capstones. Frameworks like Bootstrap are not permitted. We've found that employers prefer to see candidates who demonstrate a true understanding of CSS.
- You must have comprehensive README files for both GitHub repos (we'll discuss this step in detail at the end of this module).
- Your app must have a landing page that explains what the app does and how to get started, in addition to pages required to deliver the main functionality.
- You must deploy a live, publicly-accessible version of your app.
- Your app must live at a custom URL and include a Favicon (we'll cover this later in the module)
- Your app must work across different browsers (Chrome, Firefox, and Safari at a minimum)
- If you choose to include an authentication system in your app, you must set up a demo user account and indicate on the landing page how to use it.

## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.
### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.