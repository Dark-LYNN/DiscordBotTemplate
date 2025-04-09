import { execSync } from 'child_process';
import {
  getCommandPrefix,
  getPackageManager,
} from './detectPackageManager.mjs';
import { error, log } from 'console';
import { exit } from 'process';

/**
 * Runs Prisma database commands using the detected package manager.
 */
function runDatabaseCommands() {
  const commandPrefix = getCommandPrefix();
  log(`Using ${getPackageManager()} for database tasks...`);

  try {
    execSync(
      `${commandPrefix} prisma format && ` +
      `${commandPrefix} prisma generate && ` +
      `${commandPrefix} prisma db push`,
      { stdio: 'inherit' },
    );
  } catch (err) {
    error('Error running database commands:', err.message);
    exit(1);
  }
}

runDatabaseCommands();
