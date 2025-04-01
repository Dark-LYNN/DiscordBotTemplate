import { execSync } from 'child_process';
import { getCommandPrefix } from './detectPackageManager.mjs';

/**
 * Runs prettier
 */
function runLintCommands() {
  const prefix = getCommandPrefix();

  try {
    execSync(`${prefix} eslint '**/*.{js,ts,tsx}' --fix --cache`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Error running test commands:', error.message);
    process.exit(1);
  }
}

runLintCommands();
