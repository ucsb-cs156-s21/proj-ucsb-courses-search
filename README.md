# Demo Spring React App

[![Codecov Coverage](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-nextjs-app/branch/master/graph/badge.svg)](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-nextjs-app)

A demo todo app with Spring Boot and Create React App.

## Getting started

The first thing you'll want to do is set up your Auth0 SPA App. Instructions for setting up auth0 can be found [here](./frontend/docs/auth0.md).

Once the Auth0 SPA App is set up, you'll then need to run the following in the root directory of the project to set up your app.

- **Note:** You'll need to fill in the `auth0.domain` and `auth0.clientId` fields with the credentials from you Auth0 App in the 2 new files you've created.

```bash
# Make a copy of the secrets file for the backend
cp secrets-localhost.properties.SAMPLE secrets-localhost.properties
# Make a copy of the secrets file for the frontend
cp frontend/.env.local.SAMPLE frontend/.env.local
```

At this point, you should be able to run the app locally via

```bash
mvn spring-boot:run
```

## Deploying to Production

Deploying to production consists of the following steps:

1. Create the heroku app (if it doesn't already exist) and link it to your github repo.
2. Push all changes to the main branch, or whatever branch you deploy from.
3. If this is the first deploy, do the following

```bash
# Make your copy of the production secrets file
cp secrets-heroku.properties.SAMPLE secrets-heroku.properties

# FILL IN the missing PROPERTIES in secrets-heroku.properties (auth0 creds can carry over from localhost file)
```

4. You'll need to publish your secrets to heroku using the following command:

```bash
python setHerokuVars.py APP-NAME-ON-HEROKU
```

5. Deploy the application on Heroku.
