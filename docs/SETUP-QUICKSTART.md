# ./docs/SETUP_QUICKSTART.md

This is the abbbreviated version of the full setup instructions.  

If this is your first time working with setting up a Spring Boot / React application for this course, you should instead follow the full instruction here:

[SETUP-FULL.md](./SETUP-FULL.md) version.

Follow these only if:
* You've already been through the full instructions at least once
* You already have an Auth0 account with a tenant
* You already have Google Developer Project set up on your Google account

# What setup enables you to do
To get started with this application, you'll need to be able to
* Run it locally (i.e. on localhost)
* Deploy it to Heroku

These instructions cover this setup.

There are separate instructions in the file [./github-actions-secrets.md](./github-actions-secrets.md) for:

* Getting the test cases running on GitHub Actions
* Seeing aggregrated code coverage statistics on Codecov

# List of integrations

This application has integrations with the following third-party
services that require configuration
* Auth0.com (for authentication)
* Google (for authentication)
* A postgres database provisioned on Heroku
* UCSB Developer API <https://developer.ucsb.edu/>
* MongoDB Database provisioned at <https://cloud.mongodb.com/>


## Step 0: Get Organized

Create  `temp-credentials.txt` to keep track of the following values:

```
heroku.app:
heroku.url:
auth0.tenant:
auth0.domain:
auth0.clientId: 
google.clientId:
google.clientSecret:
app.ucsb.api.consumer_key:
spring.data.mongodb.uri:
```

This file should be in your `.gitignore`, and should not be committed to GitHub.

## Step 1: Choose an application name.


Go to the Heroku Dashboard, and choose an application name. 

The application name typically starts with either
* the assignment name (e.g. `jpa03`) or 
* an abbreviated version of the the repo name (e.g. `dsr-min` or `ucsb-courses`)

Then, add a suffix that will, with high probability, make it globally unique:
* `-cgaucho` (i.e. your ucsb email address)
* `-cs156-w21-team-4pm-3` (i.e. your team)

More rules:
* Must be <= 30 chars, lowercase letters, numbers and hyphens only (this is enforced by Heroku)
* If your ucsb email is `cgaucho@ucsb.edu`, we suggest applying these substitutions: convert to all lowercase, then replace `_` and `.` with `-`.

Once you have come up with an application name,
add it to `temp-credentials.txt`, as in this example:
 
```
heroku.app: dsr-min-cgaucho
heroku.url: https://dsr-min-cgaucho.herokuapp.com
auth0.tenant: 
auth0.domain:
auth0.clientId: 
google.clientId:
google.clientSecret: 
app.ucsb.api.consumer_key:
spring.data.mongodb.uri:
```

## Step 2: Create an Auth0.com Account and/or Tenant

Login to Auth0 and choose the appropriate tenant.

If you don't have an Auth0 account yet, or don't know what a _tenant_ is in Auth0,  see Step 2 of the 
[SETUP-FULL.md](./SETUP-FULL.md) version.


## Step 3: Set up new Auth0 application

In Auth0:
* Navigate to Applications and click `Create New Application`
* For name, choose same name you filled in for  `heroku.app` 
* Choose `Single Page Application`
* Click `Create`
* You may skip the "Quick Start" step for "Choose a Technology".
* Click on the `Settings` tab, and scroll down to the 
heading `Application URIs.
* Fill in these values 
in the appropriate fields, noting that:
  * The URL values that include the word `localhost` start with `http`, while the ones that contain `herokuapp` start with `https`. 
  * The value `dsr-min-cgaucho` should be replaced in EVERY case with the actual value you used for   `heroku_app_name` in your `temp-credentials.txt`; it should not literally be `dsr-min-cgaucho`.

| Field                 | Value                                        |
| --------------------- | -------------------------------------------- |
| Allowed Callback URLs | http://localhost:3000, http://localhost:8080, https://dsr-min-cgaucho.herokuapp.com |
| Allowed Logout URLs   | http://localhost:3000, http://localhost:8080, https://dsr-min-cgaucho.herokuapp.com |
| Allowed Web Origins   | http://localhost:3000, http://localhost:8080, https://dsr-min-cgaucho.herokuapp.com |

Make sure to scroll down and click "Save Changes" at the bottom of the page.

Now, in the "Connections" tab of **your app** (not from the sidebar)

- Uncheck Username-Password-Authentication.
- Ensure `google-oauth2` is checked (it should be by default).
  See image below for an example of what it should look like.

![Auth0 Connections Settings](./images/auth0-connections-settings.png)

Next, go back to the Settings tab of your app (the same tab where you entered the callback URIs).   

At this point, you should be able to find the value for for `Domain` and `Client ID`, and use these to fill in the values for
`auth0.domain` and `auth0.clientId` in your  `temp-credentials.txt` file.  


Your `temp-credentials.txt` file should now look something like this:

```
heroku.app: dsr-min-cgaucho
heroku.url: https://dsr-min-cgaucho.herokuapp.com
auth0.tenant: ucsb-cs156-cgaucho
auth0.domain: ucsb-cs156-cgaucho.us.auth0.com
auth0.clientid: 6KoPsWMM2A27PjAejHHWTXApra8CVQ6C
google.clientId:
google.clientSecret: 
app.ucsb.api.consumer_key:
spring.data.mongodb.uri:
```

## Step 4: Set up an API under Auth0

Go to the sidebar in Auth0, and locate the `APIs` tab.

You should see (at least) one API listed, namely the `Auth0 Management API`. This API is used to manage all other APIs, so we'll create an API that is specific to just our application.

First, click on the `Create API` button.

Next, fill in the fields as follows:
| Field name | Value | Description |
|------------|-------|-------------|
| Name | The name of your application | This is just a visual name for the Auth0 API of your application, and in principle it could be anything.  But to help keep things organized, we'll use the same value that we used for the `heroku.app`,   Example `dsr-min-cgaucho`|
| Identifier | Copy your heroku.url into this field also; i.e. `https://dsr-min-cgaucho.herokuapp.com` | This will end up serving as the `Audience` value. |
| Signing algorithm | RS256 | This determines what cryptographic algorithm is used to verify tokens. The standard is RS256, so we use that here |

It should end up looking like the below image (with your application name):


![Auth0 API setup](./images/auth0-api-setup.png)

Hit `Create` to create your API.

## Step 5: Set up new Google OAuth Application (once per Auth0 tentant)

NOTE: This step only has to be done *once per Auth0 tenant*, not once per
application. Accordingly, we are putting this step only into the 
[SETUP-FULL.md](./SETUP-FULL.md) version at Step 5.  Please see that version if you haven't done this step yet for your Auth0 Tenant.


 # Step 6: Set up new Auth0 Social Login Connection (once per Auth0 tentant)


NOTE: This step only has to be done *once per Auth0 tenant*, not once per
application. Accordingly, we are putting this step only into the 
[SETUP-FULL.md](./SETUP-FULL.md) version at Step 6.  Please see that version if you haven't done this step yet for your Auth0 Tenant.

## Step 7: Setting up Custom Claims in Auth0

In Auth0.com go to the left hand sidebar and click `Rules`, then click `Create Rule`. Select `Empty Rule` at the top.

The default name for your rule is `Empty Rule`.  We suggest you change this name to match `heroku.url`, the name of your application (e.g. `dsr-min-cgaucho` ).

This brings up a block of JavaScript code for you to edit.  Replace the code with this entire block of code, but _with the string_ `"https://dsr-min-cgaucho.herokuapp.com"` _replaced with your full_ `heroku.url` :

```javascript
function (user, context, callback) {
   context.accessToken["https://dsr-min-cgaucho.herokuapp.com"]={
    "email" : user.email,
    "given_name" : user.given_name,
    "family_name" : user.family_name
  };
  return callback(null, user, context);
}
```

## Step 8: Custom configuration for this app

Steps 1-7 and Step 9 are generally the same for all applications in this course.   
Step 8 is where we put special configuration that is particular this this application.

## Step 8a: UCSB Developer API Key

See the top level README.md for details about how to set the value of `app.ucsb.api.consumer_key:` in `temp-credentials.txt`

## Step 8b: MongoDB Database credentials

See the top level README.md for details about how to set the value of `spring.data.mongodb.uri:` in `temp-credentials.txt`

## Step 9: Set up the secrets files

There are now three files that you have to configure in your app&mdash;two for the frontend, and two for backend.  


### Step 9a: Set up the secrets files for localhost

For localhost, copy from the `.SAMPLE` files to the actual files
needed for the application.  From the root of the repo:

```
cp secrets-localhost.properties.SAMPLE secrets-localhost.properties
cp javascript/.env.local.SAMPLE javascript/.env.local
```

Edit the `secrets-localhost.properties` file, filling in values as shown here:

| Key | Example value | Explanation | Copy from corresponding value in `temp-credentials.txt` for |
|-----|---------------|-------------|---|
| `app.namespace` | `https://dsr-min-cgaucho.herokuapp.com` | The name you gave to your app on Heroku |  `heroku.url` |
| `app.admin.emails` | `phtcon@ucsb.edu,youremail@ucsb.edu` | A comma separated list of emails for admins for the app.  Add your email. |  (none) |
| `auth0.domain` | `ucsb-cs156-cgaucho.us.auth0.com` | The DNS hostname used to access Auth0 services; starts wtih the name of your tenant, and ends with something like `.us.auth0.com` |  `auth0.domain` |
| `auth0.clientId` | `6KoPsWMM2A27PjAejHHWTXApra8CVQ6C` | The value that identifies the specific Auth0 application from your tenant |  `auth0.clientId` |
| `app.ucsb.api.consumer_key` | | Key for UCSB Developer API| `app.ucsb.api.consumer_key` |
| `spring.data.mongodb.uri` | | URI for accessing MongoDB data | `spring.data.mongodb.uri` |
| `security.oauth2.resource.id` | `https://dsr-min-cgaucho.herokuapp.com` | Copy the same value as `app.namespace`  |  `heroku.url` |
|`security.oauth2.resource.jwk.keySetUri`| (no change)| Leave unchanged from value in `.SAMPLE` file | | 

Next, you will edit the `javascript/.env.local` file with your
preferred text editor, and fill in the values as shown below:

| Key | Example value | Explanation | Copy from corresponding value in `temp-credentials.txt` for |
|-----|---------------|-------------|---|
|`REACT_APP_AUTH0_DOMAIN`| `ucsb-cs156-cgaucho.us.auth0.com` | The DNS hostname used to access Auth0 services; starts wtih the name of your tenant, and ends with something like `.us.auth0.com` |  `auth0.domain` |
|`REACT_APP_AUTH0_CLIENT_ID`| `6KoPsWMM2A27PjAejHHWTXApra8CVQ6C`| The value that identifies the specific Auth0 application from your tenant |  `auth0.clientId` |
|`REACT_APP_AUTH0_AUDIENCE`| `https://dsr-min-cgaucho.herokuapp.com` | The name you gave to your app on Heroku (used here to identify which Auth0 API we are using)`heroku.url` |

At this point, you should be able to run the app on localhost with the command:

```bash
mvn spring-boot:run
```


### Step 9b: Set up the secrets files for Heroku

For Heroku, copy from the `.SAMPLE` file the backend file to the
actual file:

```
cp secrets-heroku.properties.SAMPLE secrets-heroku.properties
```

You do not need a separate `javascript/.env.production` file.


All of the following variables should be set up *exactly* as they are in the `secrets-localhost.properties` file.  So just copy/paste the values for these variables from that file into `secrets-heroku.properties`

```
app.namespace
app.admin.emails
auth0.domain
auth0.clientId
app.ucsb.api.consumer_key
app.ucsb.api.consumer_key
security.oauth2.resource.id
security.oauth2.resource.jwk.keySetUri
```

The remainder of the values should typically be unmodified.  That includes
all of the following:

```
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.datasource.driver-class-name = org.postgresql.Driver
spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults=false

spring.datasource.url=${JDBC_DATABASE_URL}
spring.datasource.username=${JDBC_DATABASE_USERNAME}
spring.datasource.password=${JDBC_DATABASE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

Now, run the python script to update these values on Heroku.

1. Login to the Heroku CLI with `heroku login -i` as shown below. 
   
   (If you need help with installing the HEROKU CLI, see the Step 8b of the [SETUP-FULL.md](./SETUP-FULL.md) version.) 

2. Then run this command, substituting the 
   * name of your value for `heroku.app` in place of `dsr-min-cgaucho`
   * the exact command your system uses for Python&nbsp;3 scripts in place of `python3`

```bash
   heroku login -i
   python3 setHerokuVars.py dsr-min-cgaucho
```

After doing this, if you visit you app on the Heroku dashboard (<https://dashboard.heroku.com>), go to the Settings tab, click "Reveal Config Vars", and look for the value of the variable `SPRING_PROPERTIES`, you should see the values from your file reflected there.
                                                                  |
At this point, if you deploy the main branch of your repo on Heroku, the 
app should load.  You may need to deploy twice if this is your first time deploying the app (so that the database provisions properly.)

If you need to see the logs to debug problems on Heroku, use this command:

```
heroku logs --tail --app APP-NAME-ON-HEROKU`.
```


