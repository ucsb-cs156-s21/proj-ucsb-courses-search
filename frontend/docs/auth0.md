# Setting up Authentication

This project uses Auth0 and Google OAuth for authentication (checking usernames and passwords for logging in).    

Auth0 is a service that allows you to set up an application where you "login in with Google" or "login with GitHub" or "login with Facebook", etc.  (This process of allowing users to login into an application with multiple providers is sometimes called *Federated Login*).

## Setting up Auth0

First, [sign up for an account with Auth0](https://auth0.com/signup); we suggest using your GitHub credentials as your login for Auth0. You will be asked to create a *tenant* (a *tenant* in this case, is just an instance of using Auth0 for some application or set of applications.  You need at least one *tenant* before you can start using Auth0.)

Next, register a new application. You do this by navigating to the "Applications" page in the sidebar and clicking the
"Create Application" button. Give it a name (e.g. `test-demo-spring-react-app`) and ensure you set it up as a "Single Page Application".

In the configuration for the application you just created, click on the "Settings" tab and fill in the following values
in the appropriate fields:

| Field                 | Value                                        |
| --------------------- | -------------------------------------------- |
| Allowed Callback URLs | http://localhost:3000, http://localhost:8080 |
| Allowed Logout URLs   | http://localhost:3000, http://localhost:8080 |
| Allowed Web Origins   | http://localhost:3000, http://localhost:8080 |

Make sure to click "Save Changes" at the bottom of the page to save your changes.

## Secrets files (e.g. `.env`)

This section describes files such as `.env`, `secrets-localhost.properties`, `secrets-heroku.properties` etc. in which we store application *secrets*.

It is typical for web applications to require *secrets*, i.e. values that are passed to various services (such as Auth0, a database, cloud platforms, etc.) in order to make things work.    Tutorials often show code that has these secrets hardcoded into your source code (in Java, JavaScript, Python, etc.).  This is a bad idea; don't do this.  If you put these values in your source code, they often end up in Github, and eventually get leaked, creating security vulnerabilities.

Instead, a better practice is:
* Designate a file such as `.env` that is is your `.gitignore` (and thus never stored in GitHub)
* Put your secrets in this file
* Access the secrets from your Java, JavaScript, Python code (or whatever language).

It is common practice to have a file such as `.env.SAMPLE` that can be used as a template for the `.env` file; this file DOES often exist in the Github repo.  You can copy this file to `.env` and then edit it to put in your secrets.    

In this repo, we have the following templates for secrets:

| Template | File you should copy it to | explanation |
|----------|----------------------------|-------------|
| `secrets-localhost.properties.SAMPLE` |  `secrets-localhost.properties` |  Java Spring Boot backend when running locally |
| `secrets-heroku.properties.SAMPLE` |  `secrets-heroku.properties` |  Java Spring Boot backend when running on Heroku |
| `frontend/.env.local.SAMPLE` | `frontend/.env.local` | React Frontend code when running locally | 
| `frontend/.env.production.SAMPLE` | `frontend/.env.production` | React Frontend code when running on Heroku | 
 
# Now returning to the Auth0 configuration...

On the same page you should see a "Domain" and "Client ID". Copy those values into your `frontent/.env.local` file.

In the "Connections" tab of **your app** (not from the sidebar), uncheck Username-Password-Authentication.
Ensure google-oauth2 is checked (it should be by default).

## Setting up Google OAuth

Create a Google OAuth application [here](https://developers.google.com/identity/sign-in/web/sign-in).
When prompted with "Where are you calling from", select "Web server". Set the Authorized redirect URI to
`https://<Auth0 Domain>/login/callback`, replacing `<Auth0 Domain>` with the Auth0 Domain you copied in the previous
step. Take note of the "Client ID" and "Client Secret", you will need to copy these values in the next step.

Navigate back to the Auth0 dashboard. Navigate to the "Connections -> Social" page in the sidebar. Click on "Google"
and fill in the "Client ID" and "Client Secret" you just generated. Make sure to click "Save" at the bottom of the
dialog to save your changes.

For developing on localhost, this is all you have to do. Once you have deployed your app to production, follow the
next step.

## After your first deploy

In order for Auth0 to recognize the app running on your new production url, you will need to make a small change to the
app you created in the first step.

Navigate back to the settings page of the app you created in the Auth0 dashboard. For every field that references
http://localhost:3000, add a comma-separated entry after the existing entry referencing your new production url instead
of localhost. It is important you include both localhost and production urls so that both your localhost and production
apps will work properly.

For example, if your production url is , https://your-heroku-app-name.heroku.com, your fields should now look like this:

| Field                 | Value                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- |
| Allowed Callback URLs | http://localhost:3000, http://localhost:8080, https://your-heroku-app-name.heroku.com |
| Allowed Logout URLs   | http://localhost:3000, http://localhost:8080, https://your-heroku-app-name.heroku.com |
| Allowed Web Origins   | http://localhost:3000, http://localhost:8080, https://your-heroku-app-name.heroku.com |

Don't just copy the above values, replace , https://your-heroku-app-name.heroku.com with the link to your own deployment of
the production app.

Don't forget to click "Save Changes" at the bottom of the page!
