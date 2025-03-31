# Contributing to this project

Thank you for your interest in contributing to this project!
Contributions are what make open-source projects thrive.
To help you get started, please follow this guide to ensure a smooth collaboration.

---

## Table of Contents

- [Contributing to this project](#contributing-to-this-project)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Code of Conduct](#code-of-conduct)
  - [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Features](#suggesting-features)
    - [Contributing Code](#contributing-code)
  - [Development Workflow](#development-workflow)
  - [Commit Messages](#commit-messages)
  - [Pull Request Guidelines](#pull-request-guidelines)
  - [License](#license)

---

## Getting Started

1. **Fork the repository:**
   - Visit the [repository](https://github.com/LynnuxDev/Akira)
     and click on the `Fork` button.
2. **Clone your fork:**

   ```bash
   git clone https://github.com/your-username/Akira.git
   ```

3. **Set up your environment:**

   - Ensure you have [Node.js](https://nodejs.org/) installed (version 22 or higher).
   - Install dependencies:

     ```bash
     npm install
     ```

---

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand
the expectations for participating in this project.

---

## How to Contribute

### Reporting Bugs

- Check if the issue already exists in the [issues list](https://github.com/LynnuxDev/Akira/issues).
- Create a new issue and include:
  - A clear, descriptive title.
  - Steps to reproduce the bug.
  - Expected vs. actual behavior.
  - Any error logs or screenshots.

### Suggesting Features

- Check if your feature idea is already being discussed in the
  [issues list](https://github.com/orgs/LynnuxDev/discussions/categories/ideas).
- Open a new discussion and include:
  - A clear, descriptive title.
  - The problem your feature solves and/or what you want to see added to Akira.
  - Details of the proposed solution.

### Contributing Code

- Before starting work, comment on an issue or open a discussion to
avoid duplicate work.
- Follow the [Development Workflow](workflow.md) to make and test your changes.

---

## Development Workflow

1. **Create a branch:**

   - Name your branch descriptively, e.g., `feat/command-handler` or `fix/message-typo`.

     ```bash
     git checkout -b fix/issue-123
     ```

2. **Make your changes:**

   - Follow the project's [coding style](./styling.md).
   - Add or update documentation/comments where needed.

3. **Run tests:**

   - Ensure your changes pass all tests.

     ```bash
     npm run test:all
     ```

   - If applicable, run a bot instance to ensure stability:

     ```bash
     npm run start
     ```

4. **Commit your changes:**

   - Use [conventional commits](https://www.conventionalcommits.org/) for
     commit messages (see [Commit Messages](#commit-messages)).

5. **Push your branch:**

   ```bash
   git push origin branch-name
   ```

6. **Open a pull request:**
   - Go to the [Pull Requests](https://github.com/LynnuxDev/Akira/pulls) section.
   - Provide a detailed description of your changes.

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

- **feat:** A new feature.
- **fix:** A bug fix.
- **docs:** Documentation updates.
- **chore:** Non-code changes.
- **style:** Code style changes without affecting logic.
- **refactor:** Code restructuring without functionality changes.
- **perf:** A code change that improves performance.
- **test:** Adding or modifying tests.
- **build:** Changes to the build process or tools.
- **ci:** Changes to Continuous Integration configurations.

> [!NOTE]
> First commit changes, then run `npm run build`,
> after that commit the changelog and push to your repo.

---

## Pull Request Guidelines

- Ensure your PR description includes:
  - The problem it solves.
  - A summary of changes.
  - Relevant issue numbers (e.g., `Closes #123`).
- Ensure your code is well-documented and follows the project's coding style.
- Pass all automated tests.

---

## License

By contributing, you agree that your contributions will be licensed under
the same license as this repository ([BSD 4-Clause License](../LICENSE)).
