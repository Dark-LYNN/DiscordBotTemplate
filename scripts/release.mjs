import { execSync } from 'child_process';
import { getCommandPrefix } from './detectPackageManager.mjs';

/**
 * Runs the tests
 */
function runReleaseCommands() {
  const prefix = getCommandPrefix();

  try {
    execSync(`${prefix} commit-and-tag-version`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running test commands:', error.message);
    process.exit(1);
  }
}

runReleaseCommands();
