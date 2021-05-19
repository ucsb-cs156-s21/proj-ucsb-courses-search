import { danger, fail, markdown } from 'danger';

const sampleFiles = danger.git.fileMatch('**/*.SAMPLE');
const packageJson = danger.git.fileMatch('javascript/package.json');
const packageLock = danger.git.fileMatch('javascript/package-lock.json');

if (packageLock.modified && !packageJson.modified) {
  const errorMessage = `
It looks like your PR contains changes to the \`javascript/package-lock.json\` file. You should not be modifying this
file unless you are updating the project's dependencies.
<details>
  <summary>Instructions for removing this change from your commit</summary>
  
  Run the following commands in the base directory of the project:
  
  \`\`\`sh
  git checkout origin/main -- javascript/package-lock.json
  git commit -m "Revert changes to package-lock.json"
  git push
  \`\`\`
</details>
`.trim();

  fail(errorMessage);
}

if (sampleFiles.deleted) {
  const errorMessage = `
It looks like you've deleted the one of the \`.SAMPLE\` configuration files. These files are used as templates for
setting up the project, so they shouldn't be removed from the repo.
<details>
  <summary>Instructions for removing this change from your commit</summary>
  
  Run the following commands in the base directory of the project:
  
  \`\`\`sh
  git checkout origin/main -- secrets-localhost.properties.SAMPLE secrets-heroku.properties.SAMPLE javascript/.env.local.SAMPLE javascript/.env.production.SAMPLE
  git commit -m "Revert changes to sample config files"
  git push
  \`\`\`
</details>
`.trim();

  fail(errorMessage);
}

const reviewReminder = `
Nice PR! Your PR can be merged once you get an approving review from a staff member and a member of your team.
Keep in mind, code reviews only count if you use the "Approve" or "Request changes" option in GitHub. You can find this
under the "Files changed" tab under the "Review changes" button.
![PR review process](https://i.postimg.cc/gkjBnwgR/pr.png)
`.trim();

markdown(reviewReminder);
