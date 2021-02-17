# Using `eslint`

The GitHub Actions for this repo include running the `eslint` utility on the contents of the `javascript/` directory
to look for style violations in JavaScript code.    

If a Pull Request fails due to style violations, in many cases you can use `eslint` to fix these by running these commands:

```
cd javascript       # if not already in the javascript directory
npx eslint --fix src
git status            # to see which files were changed
git diff                 # to see exactly what changed
```

Then do a commit to commit the fixes.

# Rules that aren't fixed automatically

There are a few common violations that
have to be fixed manually:

* Removing unused imports
* Removing unused variables and arguments (or you can mark them to be ignored by prefixing them with `_` e.g. `_result` instead of `result`).

# Configuring the Rules

The rules for eslint are configured
in the file `javascript/.eslintrc.json`

See the [ESLint documentation](https://eslint.org/docs/user-guide/configuring/configuration-files#using-configuration-files) for more information the syntax for configuring these rules.