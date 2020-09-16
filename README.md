# Demo Spring React App

[![Codecov Coverage](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-react-app/branch/master/graph/badge.svg)](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-react-app)

A demo todo app with Spring Boot and Create React App.

## Getting started

The first thing you'll want to do is set up your Auth0 SPA App. Instructions for setting up auth0 can be found [here](./frontend/docs/auth0.md).

- As part of these instructions, you will have created `frontend/.env.local` from `frontend/.env.local.SAMPLE`
- Next, run this command to create a secrets file for the backend when running on localhost:
  ```bash
  cp secrets-localhost.properties.SAMPLE secrets-localhost.properties
  ```
- Next, you need update the values in your new `secrets-localhost.properties`. You can copy the corresponding values from the `frontend/.env.local`,
  using this guide:

  | For this value in `secrets-localhost.properties` | Use this value from `frontend/.env.local` |
  | ------------------------------------------------ | ----------------------------------------- |
  | `auth0.domain`                                   | `REACT_APP_AUTH0_DOMAIN`                  |
  | `auth0.clientId`                                 | `REACT_APP_AUTH0_CLIENT_ID`               |
  | `security.oauth2.resource.id`                    | `REACT_APP_AUTH0_AUDIENCE`                |

  You may see additional values in `secrets-localhost.properties` such as the ones below. You do not need to adjust these; leave the values alone.

  ```
  security.oauth2.resource.jwk.keySetUri=https://${auth0.domain}/.well-known/jwks.json
  ```

At this point, you should be able to run the app locally via

```bash
mvn spring-boot:run
```

## Deploying to Production

Deploying to production consists of the following steps:

1. Push all changes to the main branch, or whatever branch you'd like to deploy from.  (You can deploy on Heroku from any branch, although we typically deploy from `main` unless this is a Heroku deployment specifically designated as `test` or `qa`)
2. Create the heroku app (if it doesn't already exist).  Don't link it to a GitHub repo just yet, but do create it, because we need the name of the app for the steps that follow.
3. Now, you need to add the URL for your new herokuapp (e.g. `https://myapp-for-whatever.herokuapp.com`) to the Auth0 setup.  Instructions to do that can be found in the "Heroku" section of this page: [./frontend/docs/auth0.md](./frontend/docs/auth0.md#setting-up-authentication-on-heroku).  Please follow those instructions, then return to this page and go to the next step.


4. Before linking your Heroku app to a GitHub repo, run the following commands to setup the front end and back end secrets files for heroku/production

```bash
cp frontend/.env.local frontend/.env.production
cp secrets-heroku.properties.SAMPLE secrets-heroku.properties
```

5. In the step above, we copied from 
   `frontend/.env.local` to `frontend/.env.production` because, for now,
   all of those values should be the same.   (Be aware that in other
   applications, there may be contexts where the values between `.env.local` and `.env.production` may need to be different, but for this application,
   they can be the same.)

5. Edit the back end secrets file 
   `./secrets-heroku.properties`. For the following values, fill in the corresponding values from `./secrets-localhost.properties`
   
   ```
   auth0.domain=FILL-IT-IN
   auth0.clientId=FILL-IT-IN
   security.oauth2.resource.id=FILL-IT-IN
   ```

   Note that there are likely many other lines in 
   `./secrets-heroku.properties` that came 
   from `secrets-heroku.properties.SAMPLE`.  Leave those lines alone for now.

6. The next step is to set up secrets on Heroku.  This involves taking the
   values that are in your secrets files (i.e. `./frontend/.env.production` and
   `./secrets-heroku.properties`) and propagating those values into 
   what Heroku calls "Config Vars".  Heroku "Config Vars" are exposed to
   running Heroku apps as "Environment Variables".

   This can be done by hand, but it is a tedious and error-prone process.
   A better way is to use the script provided below; be aware, though, that this
   script requires two pre-requisites to be installed on your local system:
   * Heroku CLI
   * some version of Python 3

   Note that Even if you use your local machine for everything else, this step alone *can*
   be done on CSIL if you are having difficulty getting those installed on your
   local system; CSIL already has both Python3 and the Heroku CLI installed.

   To publish your Heroku/Produciton secrets to heroku config vars, use the following command.  `APP-NAME-ON-HEROKU` should be replaced with whatever
   you called your app; not the full URL, just the name.   You need to be logged
   in to the Heroku CLI for this to work; the command for that is 
   `heroku login -i`

   ```bash
   python3 setHerokuVars.py APP-NAME-ON-HEROKU
   ```

   Note that the first line of this command might be `python3` or simply 
   `python`, depending on your particular operating system and installation
   of Python.  If you are not sure, use `python -v` or `python3 -v` to see
   which command gives you some version of Python 3.

7. Now you are ready to return to the Heroku Dashboard <https://dashboard.heroku.com>, to link your Heroku app to a GitHub repo 
   and deploy the branch of your choosing (typically `main`).

   You can follow the progress of your app being deployed on the Heroku Dashboard
   website.  Once it is fully deployed, you should be able to open it and
   use Auth0 to login, and access the app's features.

   If instead, you get `Application Error` when opening the page, before 
   you'll need to
   consult the logs to debug the problem; *however*, if this is
   your first deploy, try simply redeploying once.  Our experience
   has been that sometimes on the very *first* deploy to Heroku, the
   database connection is not properly established, but this problem
   corrects itself on the second deploy.
   
   If after the second deploy attempt you are still getting
   `Application Error` when loading the app, you'll need to consult
   the logs for further debugging. You can see these either through the
   Heroku Dashboard, or at the command line if you have the Heroku CLI
   installed.  The command is: `heroku logs --app APP-NAME-ON-HEROKU`.
