# Discord.js Bot Template (TypeScript)

[![Maintainability][maintainabilityImage]][maintainabilityURL]
[![Code Coverage][coverageImage]][coverageLink]
[![Discord.js][discordJSBadge]][discordjsURL]
[![License: BSD-4-Clause][licenseBadge]][licenseURL]

This is a template for a Discord.js bot written in TypeScript.
It is designed to work with `pnpm`, `npm`, and `yarn` and
includes a Prisma database integration.
The template is licensed under BSD-4-Clause and
comes with essential GitHub-related files.

## Features

- Written in **TypeScript** for type safety.
- Supports **pnpm**, **npm**, and **yarn** for installation.
- Uses **Prisma** as the database ORM.
- Pre-configured **ESLint** and **Prettier** for code quality.
- Includes **GitHub-related** files (e.g., `.gitignore`, `LICENSE`, `Issue Templates`).
- Organized structure with handlers for commands, events, interactions, and loops.
- Custom logging with Winston.

Project Structure

```txt
.
├── prisma               # Prisma schema and database file
├── scripts              # Package scripts (DB setup, linting, etc.)
├── src                  # Source code
│   ├── bot              # Core bot logic
│   ├── commands         # Command files
│   ├── events           # Event listeners
│   ├── middleware       # Middleware for permission checks
│   ├── tests            # Unit tests
│   ├── types            # TypeScript types
│   └── utils            # Utility functions
├── .eslintrc.cjs        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── LICENSE              # BSD-4-Clause License
└── README.md            # Project documentation
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dark-LYNN/DiscordBotTemplate.git
   cd discordbot-template
   ```

2. Install dependencies with your preferred package manager:

   ```bash
   # Using pnpm
   pnpm install

   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the root directory.
   - Add your bot token and database URL:

     ```env
     DATABASE_URL=file:./database.db

     DISCORD_TOKEN=your-bot-token
     DISCORD_CLIENT_ID=your-bot-client-id
     ```

4. Initialize the database:

   ```bash
   npm run db  # or pnpm db / yarn db
   ```

## Usage

### Development Mode

```bash
npm run dev  # or pnpm dev / yarn dev
```

This will start the bot using `nodemon` with
`ts-node` to watch for file changes.

### Production Mode

```bash
npm run build  # or pnpm build / yarn build
npm run start  # or pnpm start / yarn start
```

This will compile TypeScript to JavaScript and start the bot.

## Scripts

- `lint` – Run ESLint
- `lint:fix` – Auto-fix linting issues
- `lint:spell` – Run spell checking
- `lint:format` – Format code with Prettier
- `release` – Release a new version
- `test:all` – Run all tests
- `db` – Setup the database

## Contributing

Contributions are welcome!
Feel free to open an issue or pull request.

For info about contributing see our [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## License

This project is licensed under the **BSD-4-Clause License**.
See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Thanks to all contributors and open-source projects that inspired this template.

[maintainabilityImage]: https://qlty.sh/badges/3c84a17d-831c-4f7d-bf04-3b587065f27b/maintainability.svg?v2
[maintainabilityURL]: https://qlty.sh/gh/Dark-LYNN/projects/DiscordBotTemplate
[discordJSBadge]: https://img.shields.io/badge/discord.js-^14.18.0-orange
[discordjsURL]: https://discord.js.org/
[licenseBadge]: https://img.shields.io/badge/license-BSD--4--Clause-blue
[licenseURL]: https://www.tldrlegal.com/license/4-clause-bsd
[coverageImage]: https://qlty.sh/badges/3c84a17d-831c-4f7d-bf04-3b587065f27b/test_coverage.svg
[coverageLink]: https://qlty.sh/gh/Dark-LYNN/projects/DiscordBotTemplate
