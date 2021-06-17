# EVE-YEMEK DASHBOARD
Eve-Yemek's admin dashboard is the platform where **Administrators**, **Restaurant Owners**, & **Managers** operate Eve-Yemek's application.

## Build status
**In Progress**
 
## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used
<b>Built with</b>
- [Nextjs](https://nextjs.org/)
- [PrimeReact](https://primefaces.org/primereact/showcase/#/setup)

## Features
- **axios** for http requests.
- **formik** for form validation.
- **moment** for parsing, validating, manipulating and displaying date/time.
- **redux-thunk** for state management.
- **socketio** for live orders.
- **FCM** for push notifications.

## Installation & Configuration
- This project is divided into branches, `master` branch is never to be touched.
- `develop` branch is the default branch where every branch is cloned from, & every pull request is merged to.
- Start by cloning the develop branch using `git clone https://github.com/tr-food/admin-panel-js.git`
- Head into `package.json` to understand what packages the project uses and get familiarized with it.
- There are 4 scripts in `package.json`: `dev`, `build`, `start`, & `export`.
- As a new comer, You will mostly use the `dev` script, it activates the project with a **watch** command.
- The `dev` command can be activated using `npm run dev` or `yarn dev`, with `npm` being preferrable over `yarn` in the whole project.
- Once the project is activated, head to (http://localhost:5001)
- Request the login details to the dashboard from one of the seniors.

## API Reference
The main **API Reference** is (https://api.eve-yemek.com) which serves as the backend of this dashboard.

## How to start working?
- Request an email from the delivery lead Bash, this email will be used for communication & 3rd party apps.
- We use Slack as the main communication platform in the team. An invitation will be sent to you from Bash.
- We Use JIRA for task management. An invitation will be sent to you from Bash.
- We Use Git Flow for task implementation, if You dont know what Git Flow is, follow this [link](https://guides.github.com/introduction/flow/)

### Work flow
- A ticket is assigned to You in JIRA from one of the seniors.
- You open a branch for it following the standard of: `feature/SB-XXX` / `hotfix/SB-XXX` etc..
- You make sure the branch is cloned from the `develop` branch and is up to date with the latest changes.
- You finish your task & push the codes to remote.
- You head to github and open a pull request for the branch, then move your ticket to `awaiting PR` column in JIRA.
- If the PR is approved & merged by one of the seniors, You delete the branch if it's safe to delete, and move the ticket to `awaiting deployment` column in JIRA.
- It will be deployed by the Tech Lead Mahmut.
- It will be tested by the QA.
- It may go back & forth from `In Progress` & `In QA`.
- If & when everything goes as planned and the ticket is finished, it will be resolved to `Done` by Bash.
## Credits
This project's contributors are:
- CEO Charlie
- Delivery Lead Bash
- Tech Lead Mahmut
- Tester Batyr
- Senior Feras
- Ramazan
- Mohammed Anwar
- Abdulkader
- Usama