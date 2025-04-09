import { execSync } from 'child_process';
import { getCommandPrefix } from './detectPackageManager.mjs';
import { exit } from 'process';
/**
 * Runs prettier
 */
function runLintCommands() {
  const prefix = getCommandPrefix();

  try {
    execSync(`${prefix} prettier --check '**/*.{js,ts,json}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Error running test commands:', error.message);
    exit(1);
  }
}

runLintCommands();
