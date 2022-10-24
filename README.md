# ucsb-courses-search

[![codecov](https://codecov.io/gh/ucsb-cs156-s21/proj-ucsb-courses-search/branch/main/graph/badge.svg?token=oRuQrNWHMx)](https://codecov.io/gh/ucsb-cs156-s21/proj-ucsb-courses-search)
* [Docs](https://ucsb-cs156-s21.github.io/proj-ucsb-courses-search-docs/)

## Purpose

This app is a course project of <https://ucsb-cs156.github.io>, a course at [UC Santa Barbara](https://ucsb.edu).

The intention is to produce an app that has the functionality of the [Official UCSB Course Search](https://my.sa.ucsb.edu/public/curriculum/coursesearch.aspx) application, but that provides additional kinds of searches not supported by
the original application.

## Getting Started

To get started with this application, you'll need to be able to
* Run it locally (i.e. on localhost)
* Deploy it to Heroku
* Get the test cases running on GitHub Actions
* See aggregrated code coverage statistics on Codecov

This application has integrations with the following third-party
services that require configuration
* Auth0.com (for authentication)
* Google (for authentication)
* A postgres database provisioned on Heroku

All of the setup steps for running the app on localhost and Heroku are described in these  file: 
* [./docs/SETUP-FULL.md](./docs/SETUP-FULL.md) if it is your first time setting up a Spring/React app with Auth0 and Google
* [./docs/SETUP-QUICKSTART.md](./docs/SETUP-QUICKSTART.md) if you've done these steps before.

## Setting up GitHub Actions (CI/CD, CodeCov)

To setup GitHub Actions so that the tests pass, you will need to configure
some _secrets_ on the GitHub repo settings page; see: [./docs/github-actions-secrets.md](./docs/github-actions-secrets.md) for details.

This file also describes the setup for Codecov

## Property file values

This section serves as a quick reference for values found in either [`secrets-localhost.properties`](./secrets-localhost.properties) and/or [`secrets-heroku.properties`](./secrets-heroku.properties).

| Property name                                                     | Heroku only? | Explanation                                                               |
| ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `app.namespace`                                                   |              | See `Getting Started`                                                |
| `app.admin.emails`                                                |              | A comma separated list of email addresses of permanent admin users.       |
| `app.member.hosted-domain`                                        |              | The email suffix that identifies members (i.e. `ucsb.edu` vs `gmail.com`) |
| `app.ucsb.api.consumer_key`                                        |              | The "consumer key" from the site <https://developer.ucsb.edu>; see below for more information. |
| `spring.data.mongodb.uri` |  | The URL for read only access to the MongoDB database with archived course data; see more information below. |
| `auth0.domain`                                                    |              | See `Getting Started`                                                |
| `auth0.clientId`                                                  |              | See `Getting Started`                                                |
| `security.oauth2.resource.id`                                     |              | Should always be same as `${app.namespace}`                                   |
| `security.oauth2.resource.jwk.keySetUri`                          |              | Should always be `https://\${auth0.domain}/.well-known/jwks.json`         |
| `spring.jpa.database-platform`                                    | Yes          | Should always be `org.hibernate.dialect.PostgreSQLDialect`                |
| `spring.datasource.driver-class-name`                             | Yes          | Should always be `org.postgresql.Driver`                                  |
| `spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults` | Yes          | Should always be `false`                                                  |
| `spring.datasource.url`                                           | Yes          | Should always be `${JDBC_DATABASE_URL}`                                   |
| `spring.datasource.username`                                      | Yes          | Should always be `${JDBC_DATABASE_USERNAME}`                              |
| `spring.datasource.password`                                      | Yes          | Should always be `${JDBC_DATABASE_PASSWORD}`                              |
| `spring.jpa.hibernate.ddl-auto`                                   | Yes          | Should always be `update`                                                 |

## Obtaining an API key 

You'll need to obtain an API key for the <https://developer.ucsb.edu> site
that is authorized for these APIs:

* <https://developer.ucsb.edu/content/academic-curriculums>
* <https://developer.ucsb.edu/content/academic-quarter-calendar>
* <https://developer.ucsb.edu/content/student-record-code-lookups>

You may be able to sign up for an account yourself, or you can obtain
an API key from your instructional staff (instructor, TA, or LA).

If you are a student in CMPSC 156, check the slack channel for your 
team or project; your instructional staff may already have shared
an API key with you.   This key will be used for the value of `app.ucsb.api.consumer_key` in 
a later step.

## MongoDB URL

You'll also need a value for the MongoDB URL for read-only access to the
archived course data.

For students working on the project, you will typically not need to
set up your own instance of this database; instead the course staff
will do that for you.

However, if you are *are* the course staff, or you just want to know how
to set it up yourself,  you should consult
the repo <https://github.com/ucsb-cs156-f20/ucsb-courses-search-support-scripts> which describes the process for
setting up that database.

This url is used for the value of `spring.data.mongodb.uri`

# Storybook Support

To run React Storybook:

* cd into `javascript`
* use: `npm run storybook`
* This should put the storybook on <http://localhost:6006>

Additional stories are added under `javascript/src/stories`

For documentation on React Storybook, see: <https://storybook.js.org/>
