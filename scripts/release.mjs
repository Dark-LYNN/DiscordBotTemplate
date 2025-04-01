import { execSync } from 'child_process';
import { getCommandPrefix } from './detectPackageManager.mjs';
import { error } from 'console';
import { exit } from 'process';

/**
 * Runs the tests
 */
function runReleaseCommands() {
  const prefix = getCommandPrefix();

  try {
    execSync(`${prefix} commit-and-tag-version`, { stdio: 'inherit' });
  } catch (err) {
    error('Error running test commands:', err.message);
    exit(1);
  }
}

runReleaseCommands();
