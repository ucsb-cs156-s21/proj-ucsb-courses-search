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

  You may see additional values in `secrets-localhost.properties` such as the ones below. You do not need to adjust these; leave the values alone.

  ```
  security.oauth2.resource.id=https://${auth0.domain}/api/v2/
  security.oauth2.resource.jwk.keySetUri=https://${auth0.domain}/.well-known/jwks.json
  ```

At this point, you should be able to run the app locally via

```bash
mvn spring-boot:run
```

## Deploying to Production

Deploying to production consists of the following steps:

1. Create the heroku app (if it doesn't already exist) and link it to your github repo.
2. Push all changes to the main branch, or whatever branch you'd like to deploy from.
3. If this is the first deploy, you'll need to run the following commands:

```bash
# Make your copy of the production secrets file
# FILL IN the missing PROPERTIES in secrets-heroku.properties (auth0 creds can carry over from localhost file)
cp secrets-heroku.properties.SAMPLE secrets-heroku.properties

# Make your copy of the production secrets file for the frontend
# Fill in the missing properties by copying them over from your `.env.local`
cp frontend/.env.production.SAMPLE frontend/.env.production
```

4. You'll need to publish your secrets to heroku using the following command:

```bash
python setHerokuVars.py APP-NAME-ON-HEROKU
```

5. Deploy the application on Heroku.
