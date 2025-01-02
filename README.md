# Patchwork Communities CLI
NPM CLI for adding communities features to Mastodon.

## Getting started
To add community features to your Mastodon project, you can run the following command under the root of your Mastodon project:

```bash
npx @newsmast/patchwork-communities-cli init
```

## Contributing
We welcome contributions! To contribute to this project, follow these steps:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Build the project:
    ```bash
    npm run build
    ```
5. Link the package locally:
    ```bash
    npm link
    ```

### Commit Message Format
We use the Angular commit message format because `semantic-release` needs it. Please follow this format for your commit messages:

```
<type>(<scope>): <subject>
```

Examples:
```
feat(parser): add ability to parse arrays
fix(parser): handle null pointer exceptions
```

### Pull Requests
Once your work is ready, create a pull request and wait for a review. If everything is okay, we'll merge it.