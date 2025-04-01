import { execSync } from 'child_process';
import {
  getCommandPrefix,
  getPackageManager,
} from './detectPackageManager.mjs';

/**
 * Runs Prisma database commands using the detected package manager.
 */
function runDatabaseCommands() {
  const commandPrefix = getCommandPrefix();
  console.log(`Using ${getPackageManager()} for database tasks...`);

  try {
    execSync(
      `${commandPrefix} prisma format && ${commandPrefix} prisma generate && ${commandPrefix} prisma db push`,
      { stdio: 'inherit' },
    );
  } catch (error) {
    console.error('Error running database commands:', error.message);
    process.exit(1);
  }
}

runDatabaseCommands();
