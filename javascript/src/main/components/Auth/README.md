This directory `javascript/src/main/components/Auth` is excluded from test coverage as of 11/16/2020.  

# Why:

* Most of this is Auth0 boilerplate code.
* It was difficult to see how to test this without internal
  knowledge of Auth0 code; it seemed to require mocking
  of sub-dependencies that are difficult to determine.

If and when test coverage for these components is added,
the comments in this file should be removed.

In the meantime, try to keep the code in these components
minimal, and restricted only to Auth0 boilerplate that 
is less critical to test.

# How

This exclusion is in `package.json` with code like this:

```yml
...
  "jest": {
    "resetMocks": true,
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/serviceWorker.js",
      "!src/setupTests.js",
      "!src/main/components/Auth/*",
      "!src/index.js"
    ],
    ...
  }
...
```

