# Demo Spring React App

[![codecov](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-react-todo-app/branch/main/graph/badge.svg)](https://codecov.io/gh/ucsb-cs156-f20/demo-spring-react-todo-app)

A demo todo app with Spring Boot and Create React App.

## Property file values

This section serves as a quick reference for values found in either [`secrets-localhost.properties`](./secrets-localhost.properties) and/or [`secrets-heroku.properties`](./secrets-heroku.properties).

| Property name                                                     | Heroku only? | Explanation                                                               |
| ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `app.namespace`                                                   |              | See `Getting Started` below                                               |
| `app.admin.emails`                                                |              | A comma separated list of email addresses of permanent admin users.       |
| `app.member.hosted-domain`                                        |              | The email suffix that identifies members (i.e. `ucsb.edu` vs `gmail.com`) |
| `auth0.domain`                                                    |              | See `Getting Started` below                                               |
| `auth0.clientId`                                                  |              | See `Getting Started` below                                               |
| `security.oauth2.resource.id`                                     |              | Should always be `${app.namespace}/api`                                   |
| `security.oauth2.resource.jwk.keySetUri`                          |              | Should always be `https://\${auth0.domain}/.well-known/jwks.json`         |
| `spring.jpa.database-platform`                                    | Yes          | Should always be `org.hibernate.dialect.PostgreSQLDialect`                |
| `spring.datasource.driver-class-name`                             | Yes          | Should always be `org.postgresql.Driver`                                  |
| `spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults` | Yes          | Should always be `false`                                                  |
| `spring.datasource.url`                                           | Yes          | Should always be `${JDBC_DATABASE_URL}`                                   |
| `spring.datasource.username`                                      | Yes          | Should always be `${JDBC_DATABASE_USERNAME}`                              |
| `spring.datasource.password`                                      | Yes          | Should always be `${JDBC_DATABASE_PASSWORD}`                              |
| `spring.jpa.hibernate.ddl-auto`                                   | Yes          | Should always be `update`                                                 |

## Getting started

The first step is to create our secrets file for running the application locally. You can do this by running the following command:

```bash
  cp secrets-localhost.properties.SAMPLE secrets-localhost.properties
```

The next thing you'll want to do is to choose a name for your application. The name should be lowercase letters, digits, and hyphens only. You'll want to then create this application on Heroku in order to verify that the name is available.

- For example, if your name is `cool-application` then your heroku application's url will end up looking like `https://cool-application.herokuapp.com`.

We will now update the following properties in `secrets-localhost.properties` with the url of our application:

| Property name              | Value                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app.namespace`            | The url of your heroku application (i.e. `https://cool-application.herokuapp.com`)                                                                       |
| `app.admin.emails`         | A comma separated list of email addresses of permanent admin users. We suggest adding your email to the list (i.e. `phtcon@ucsb.edu,youremail@ucsb.edu`) |
| `app.member.hosted-domain` | `ucsb.edu`                                                                                                                                               |

The next thing you'll want to do is set up your Auth0 SPA App. Instructions for setting up auth0 can be found [here](./docs/auth0.md).

- As part of these instructions, you will have created `javascript/.env.local` from `javascript/.env.local.SAMPLE`
- Next, you need update the values in your new `secrets-localhost.properties`. You can copy the corresponding values from the `javascript/.env.local`,
  using this guide:

  | For this value in `secrets-localhost.properties` | Use this value from `javascript/.env.local` |
  | ------------------------------------------------ | ------------------------------------------- |
  | `auth0.domain`                                   | `REACT_APP_AUTH0_DOMAIN`                    |
  | `auth0.clientId`                                 | `REACT_APP_AUTH0_CLIENT_ID`                 |
  | `security.oauth2.resource.id`                    | `REACT_APP_AUTH0_AUDIENCE`                  |

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
some _secrets_ on the GitHub repo settings page; see: [./docs/github-actions-secrets.md](./docs/github-actions-secrets.md) for details.
