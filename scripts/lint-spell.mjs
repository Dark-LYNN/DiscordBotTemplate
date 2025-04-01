import { execSync } from 'child_process';
import { getCommandPrefix } from './detectPackageManager.mjs';
import { error } from 'console';
import { exit } from 'process';

/**
 * Runs prettier
 */
function runLintCommands() {
  const prefix = getCommandPrefix();

  try {
    execSync(`${prefix} eslint '**/*.{js,ts,tsx}' --fix --cache`, {
      stdio: 'inherit',
    });
  } catch (err) {
    error('Error running test commands:', err.message);
    exit(1);
  }
}

runLintCommands();
