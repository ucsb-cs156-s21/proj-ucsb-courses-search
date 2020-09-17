# Demo Spring React App

[![codecov](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-react-todo-app/branch/main/graph/badge.svg)](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-react-todo-app)

A demo todo app with Spring Boot and Create React App.

## Getting started

The first thing you'll want to do is set up your Auth0 SPA App. Instructions for setting up auth0 can be found [here](./docs/auth0.md).

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

To deploy to production on Heroku, see: [./docs/heroku.md](./docs/heroku.md)

## Setting up GitHub Actions

To setup GitHub Actions so that the tests pass, you will need to configure
some *secrets* on the GitHub repo settings page; see: [./docs/github-actions-secrets.md](./docs/github-actions-secrets.md) for details.


