# Styling Guidelines

To ensure consistency and readability across the codebase,
we follow these coding and language style guidelines.
Adhering to these guidelines is essential for maintaining a professional
and cohesive project.

---

## Code Style

### General Rules

- Use **TypeScript** for all code.
- Follow the **[ESLint](https://eslint.org/)** style guide with
  TypeScript-specific rules.
- Indentation: Use **2 spaces**.
- Line length: Aim for a maximum of **80 characters**;
  use line breaks for readability when needed.
- Avoid using `any` type unless absolutely necessary.
- Add new types to `/src/types/`.

### Naming Conventions

- **Variables and functions:** Use `camelCase` (e.g., `handleCommand`).
- **files and Directories:** Use `PascalCase` (e.g., `CommandHandler`).

### File Organization

- Place each class or major module in its own file.
- Use meaningful and descriptive filenames (e.g., `messageHandler.ts`, `guildConfig.ts`).
- Keep imports organized:
  1. Node.js built-in modules.
  2. Local modules.
  3. Third-party dependencies.

#### Tree Structure

All source code is placed inside the src/ directory.
Below is the standard structure and its purpose:

1. Core Bot Files
   - `src/bot/` → Contains the bot’s main codes.
     - `handler/` → All bot-related handlers.
     - `index.ts` → The main bot entry file.
2. Commands, Buttons, Modals and other Response related items.
   - `src/commands/` → Contains all Slash command files, organized by module.
     - `developer/` → Developer-only commands.
     - `utilities/` → Utility commands.
   - `src/buttons/` → Contains all button interactions.
3. Event Handling
   - `src/events/` → Event listeners for Discord events.
4. Background Loops
   - `src/loops/` → Contains tasks that run periodically.
5. Middleware
   - `src/middleware` → Reusable middleware functions.
6. Database Management
   - `src/database/` → Contains database-related functions.
7. Utility Functions
   - `src/utils/` → Reusable utility functions.
     - `logger.ts` → Handles logging.
     - `regex.ts` → Stores reusable regex patterns.
8. Type Definitions
   - `src/types/` → Stores TypeScript types and interfaces.
9. Tests
   - `src/tests/` → Contains unit tests.

### Comments

- Use comments sparingly but effectively to explain**why** rather than **what**.
- For functions, use JSDoc-style comments to describe parameters and return values:

  ```ts
  /**
   * Loads a YAML translation file and retrieves the value for a given key.
   * @param lang - The language code (e.g., 'en', 'es').
   * @param key - The translation key in dot notation (e.g., 'greetings.hello').
   * @returns The translation value or an error message if the key not found.
   */
  export function loadYaml(lang: string, key: string): string {
    // Implementation
  }
  ```

---

## Language Style

### Examples

- When responding to users:
  - **Good:** "I've added the role <@&RoleID> to <@UserID>."
  - **Avoid:** "Done! :) lol"
- When an error occurs:
  - **Good:** "I couldn't find that user. Please double-check the ID and try again."
  - **Avoid:** "oops! couldn’t find. try again plz!"

> [!NOTE]
> We use `customError(client,errorID;origin)` for error handling.
>
> Errors are retrieved from the [errors.ts](src/static/errors.ts)

---

## Example Messages

### Commands

- Use concise and clear responses:

  ```txt
  !info
  - **Response:** "Hello <@UserID>! Use !help for a list of commands."
  ```

### Error Handling

- Be informative but concise:

  ```txt
  "I couldn’t complete your request because the bot lacks permission
  to manage roles in this server."
  ```

### User Engagement

- Engage naturally, but avoid being overly playful:

  ```txt
  "Did you mean to use `!ban`, or try `!help` for guidance."
  ```

---

## Git Commit Style

- Use **[Conventional Commits](https://www.conventionalcommits.org/)**
  to structure commit messages:
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

---

## Release Process

To ensure consistent releases and changelogs, follow these steps:

1.  Before releasing a new version, make sure your code adheres to the
    style guide by running:

        ```bash
        pnpm run lint:all
        ```

2.  Generate a new version and update the changelog by running:

    ```bash
    pnpm run release
    ```

3.  Push the changes and tags to the repository:

    ```bash
    git push --follow-tags origin main
    ```

By adhering to these guidelines, we can ensure that the project remains a
high-quality, professional, and user-friendly project.
Thank you for contributing and maintaining consistency!
