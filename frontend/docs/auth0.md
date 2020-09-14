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

On the same page you should see a "Domain" and "Client ID". Copy those values into your `.env` file.

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
