# Demo Spring React App

A demo todo app with Spring Boot and Create React App.

## Getting started

The first thing you'll want to do is set up your Auth0 SPA App. Instructions for setting up auth0 can be found [here](./frontend/docs/auth0.md).

Once the Auth0 SPA App is set up, you'll then need to run

```bash
# Make a copy of the secrets file for localhost
cp secrets-localhost.properties.SAMPLE secrets-localhost.properties
```

Then you'll need to fill in the `auth0.domain` and `auth0.clientId` fields with the credentials from you Auth0 App.

At this point, you should be able to run the app locally via

```bash
mvn spring-boot:run
```

## Deploying to Production

Deploying to production consists of the following steps:

1. Create the heroku app (if it doesn't already exist) and link it to your github repo.
2. Push all changes to the master branch, or whatever branch you deploy from.
3. If this is the first deploy, do the following

```bash
# Make your copy of the production secrets file
cp secrets-heroku.properties.SAMPLE secrets-heroku.properties

# FILL IN THE missing PROPERTIES in secrets-heroku.properties (auth0 creds can carry over from localhost file)
```

4. Don't forget to follow deployment instructions for the frontend at the bottom of [here](./frontend/README.md).

5. Once the frontend is deployed, you'll most likely need to update the `frontend.domain` property in `secrets-heroku.properties` so that CORS will work. Once you've updated the values, you can update them in production via

```bash
./setHerokuEnv.sh --app APP-NAME-ON-HEROKU
```

6. You may need to update values in production to point it to the newly hosted backend on heroku. Instructions for that can be found [here](./frontend/README.md).
