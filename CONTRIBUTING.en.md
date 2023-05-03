# Contributing Guidelines

> **Note**  
> Pour une version française de ce document, veuillez consulter [CONTRIBUTING.md](/CONTRIBUTING.md).

Thank you for your interest in contributing to our project! We welcome all contributions, including bug reports, feature requests, documentation improvements, and code changes.

To ensure that your contributions can be accepted quickly and easily, please follow these guidelines.

## Reporting Issues

If you find a bug or have a suggestion for a feature, you can open a new [issue](https://github.com/datactivist/nextjs-doc/issues/new).

When opening an issue:

> 1. Check the [issues](https://github.com/datactivist/nextjs-doc/issues) and [pull requests](https://github.com/datactivist/nextjs-doc/pulls) to make sure that the feature/bug has not already been addressed, or is being worked upon.
> 2. Provide as much detail as possible about the issue, including steps to reproduce the issue if applicable.

## Submitting Pull Requests

We welcome contributions to this repository.

If you want to contribute a feature or fix a bug, please follow these steps:

> 1. Check the [issues](https://github.com/datactivist/nextjs-doc/issues) and [pull requests](https://github.com/datactivist/nextjs-doc/pulls) to make sure that the feature/bug has not already been addressed, or is being worked upon.
> 2. Fork the repository.
> 3. Follow the [installation instructions](/INSTALL.md) to run the project locally
> 4. Create a new branch and make the changes in your fork.
> 5. Add associated **documentation** and/or **tests** for your changes, if applicable.
> 6. Check that your changes follow the [code style](#code-style).
> 7. Open a pull request to this repository.
> 8. In the pull request description, explain the changes you have made and why they are necessary.

## Code Style & Pre-commit

This project uses [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting. The style rules are defined in the `.eslintrc` file and the formatting rules in the `.prettierrc` file.

You can run the following commands to automatically apply the styles, and check that your code conforms to the style and formatting rules:

```bash
npm run format
npm run lint:fix
npm run lint
```

Alternatively, if you are using **VSCode**, you can install the associated **ESLint** and **Prettier** extensions to get feedback directly in your editor.

> **Warning**  
> This project uses husky to ensure that the code is compliant before each commit, if `npm run lint` or `npm run test` returns errors, the commit is cancelled.
