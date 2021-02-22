# Deploying to Production on Heroku

This consists of the following steps:

1. Push all changes to the main branch, or whatever branch you'd like to deploy from. (You can deploy on Heroku from any branch, although we typically deploy from `main` unless this is a Heroku deployment specifically designated as `test` or `qa`)
2. Create the heroku app (if it doesn't already exist). Don't link it to a GitHub repo just yet, but do create it, because we need the name of the app for the steps that follow.
3. Now, you need to add the URL for your new herokuapp (e.g. `https://myapp-for-whatever.herokuapp.com`) to the Auth0 setup. Instructions to do that can be found in the "Heroku" section of this page: [./docs/auth0.md](./docs/auth0.md#setting-up-authentication-on-heroku). Please follow those instructions, then return to this page and go to the next step.

4. Before linking your Heroku app to a GitHub repo, run the following commands to setup the front end and back end secrets files for heroku/production

```bash
cp javascript/.env.local javascript/.env.production
cp secrets-heroku.properties.SAMPLE secrets-heroku.properties
```

5. In the step above, we copied from
   `javascript/.env.local` to `javascript/.env.production` because, for now,
   all of those values should be the same. (Be aware that in other
   applications, there may be contexts where the values between `.env.local` and `.env.production` may need to be different, but for this application,
   they can be the same.)

6. Edit the back end secrets file
   `./secrets-heroku.properties`. For the following values, fill in the corresponding values from `./secrets-localhost.properties`

   ```
   auth0.domain=FILL-IT-IN
   auth0.clientId=FILL-IT-IN
   security.oauth2.resource.id=FILL-IT-IN
   ```

   Note that there are likely many other lines in
   `./secrets-heroku.properties` that came
   from `secrets-heroku.properties.SAMPLE`. Leave those lines alone for now.

7. The next step is to set up secrets on Heroku. This involves taking the
   values that are in your secrets files (i.e. `./javascript/.env.production` and
   `./secrets-heroku.properties`) and propagating those values into
   what Heroku calls "Config Vars". Heroku "Config Vars" are exposed to
   running Heroku apps as "Environment Variables".

   This can be done by hand, but it is a tedious and error-prone process.
   A better way is to use the script provided below; be aware, though, that this
   script requires two pre-requisites to be installed on your local system:

   - Heroku CLI
   - some version of Python 3

   Note that Even if you use your local machine for everything else, this step alone _can_
   be done on CSIL if you are having difficulty getting those installed on your
   local system; CSIL already has both Python3 and the Heroku CLI installed.

   To publish your Heroku/Produciton secrets to heroku config vars, use the following command. `APP-NAME-ON-HEROKU` should be replaced with whatever
   you called your app; not the full URL, just the name. You need to be logged
   in to the Heroku CLI for this to work; the command for that is
   `heroku login -i`

   ```bash
   python3 setHerokuVars.py APP-NAME-ON-HEROKU
   ```

   Note that the first line of this command might be `python3` or simply
   `python`, depending on your particular operating system and installation
   of Python. If you are not sure, use `python -v` or `python3 -v` to see
   which command gives you some version of Python 3.

8. Now you are ready to return to the Heroku Dashboard <https://dashboard.heroku.com>, to link your Heroku app to a GitHub repo
   and deploy the branch of your choosing (typically `main`).

   You can follow the progress of your app being deployed on the Heroku Dashboard
   website. Once it is fully deployed, you should be able to open it and
   use Auth0 to login, and access the app's features.

   If instead, you get `Application Error` when opening the page, before
   you'll need to
   consult the logs to debug the problem; _however_, if this is
   your first deploy, try simply redeploying once. Our experience
   has been that sometimes on the very _first_ deploy to Heroku, the
   database connection is not properly established, but this problem
   corrects itself on the second deploy.

   If after the second deploy attempt you are still getting
   `Application Error` when loading the app, you'll need to consult
   the logs for further debugging. You can see these either through the
   Heroku Dashboard, or at the command line if you have the Heroku CLI
   installed. The command is: `heroku logs --app APP-NAME-ON-HEROKU`.
